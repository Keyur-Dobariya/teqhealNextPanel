'use client';

import {useEffect, useMemo, useState} from 'react';
import {
    Avatar,
    Button, Card, DatePicker,
    Grid,
    Input,
    Popconfirm,
    Switch,
    Table,
    Tooltip,
} from 'antd';
import {Search, User} from '../../../utils/icons';
import {UserPlus, Edit, Trash2, Eye, XCircle, CheckCircle} from '../../../utils/icons';
import {useAppData, AppDataFields} from '../../../masterData/AppDataContext';
import apiCall, {HttpMethod} from '../../../api/apiServiceProvider';
import {endpoints} from '../../../api/apiEndpoints';
import appString from '../../../utils/appString';
import appKeys from '../../../utils/appKey';
import {ApprovalStatus, DateTimeFormat} from '../../../utils/enum';
import {appColor} from '../../../utils/appColor';
import dayjs from 'dayjs';
import {formatMilliseconds, profilePhotoManager} from "../../../utils/utils";
import EmpAddUpdateModel from "../../../models/EmpAddUpdateModel";
import {LoadingOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import pageRoutes from "../../../utils/pageRoutes";
import appKey from "../../../utils/appKey";
import {antTag} from "../../../components/CommonComponents";
import EmpScreenshotModel from "../../../models/EmpScreenshotModel";

const {useBreakpoint} = Grid;

export default function Page() {
    const {attendancesData} = useAppData();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const router = useRouter();

    const [allData, setAllData] = useState(attendancesData);
    const [isSsModelOpen, setSsModelOpen] = useState(false);
    const [screenshots, setScreenshots] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [loadingUsers, setLoadingUsers] = useState({});
    const [selectedEmp, setSelectedEmp] = useState(null);

    useEffect(() => {
        setAllData(attendancesData);
    }, [attendancesData]);

    const filteredData = useMemo(() => {
        if (!allData) return [];
        const query = searchText.toLowerCase();
        return allData.filter(
            data =>
                (
                    data?.userData?.fullName?.toLowerCase().includes(query)
                )
        );
    }, [allData, searchText]);

    const showScreenshotModel = ({screenshots, id}) => {
        setSsModelOpen(true);
        setScreenshots([...screenshots]);
        setSelectedId(id)
    };

    const timeFormater = (time) => {
        return time ? formatMilliseconds(time) : "00:00:00";
    }

    const columns = [
        {
            title: appString.userName,
            dataIndex: appKey.userData,
            key: 'userData.fullName',
            render: (text, record) => record?.userData ? (
                <div className="flex items-center gap-2">
                    <Avatar src={profilePhotoManager({url: record?.userData?.profilePhoto, gender: record?.userData?.gender})}
                            size="default"/>
                    <div className="flex-1 font-medium">{record.userData.fullName}</div>
                </div>
            ) : null,
        },
        {
            title: appString.totalHours,
            dataIndex: appKey.totalHours,
            key: appKey.totalHours,
            render: (totalHours) => {
                return antTag(
                    timeFormater(totalHours),
                    'geekblue'
                );
            },
        },
        {
            title: appString.workingHours,
            dataIndex: appKey.workingHours,
            key: appKey.workingHours,
            render: (workingHours) => {
                return antTag(
                    timeFormater(workingHours),
                    'green'
                );
            },
        },
        {
            title: appString.breakHours,
            dataIndex: appKey.breakHours,
            key: appKey.breakHours,
            render: (breakHours) => {
                return antTag(timeFormater(breakHours), 'red');
            },
        },
        {
            title: appString.lateArrival,
            dataIndex: appKey.lateArrival,
            key: appKey.lateArrival,
            render: (lateArrival) => {
                return antTag(timeFormater(lateArrival), 'orange');
            },
        },
        {
            title: appString.overtime,
            dataIndex: appKey.overtime,
            key: appKey.overtime,
            render: (overtime) => {
                return antTag(timeFormater(overtime), 'purple');
            },
        },
        {
            title: appString.screenshots,
            key: appKey.screenshots,
            render: (_, record) => {
                let screenshots = record?.screenshots;
                let attendanceID = record?._id;

                return (
                    <>
                        <Avatar.Group size="default" max={{count: 4}}>
                            {screenshots && screenshots.length > 0 ? (
                                screenshots.slice(0, 4).map((image, index) => (
                                        <>
                                            <Avatar key={index} src={image?.image} onClick={() => showScreenshotModel({
                                                screenshots: screenshots,
                                                id: attendanceID
                                            })}
                                                    style={{cursor: "pointer"}}/>
                                        </>
                                    )
                                )
                            ) : (
                                <Tooltip title="No screenshots available">
                                    <Avatar
                                        size="default"
                                        style={{
                                            backgroundColor: "#f56a00",
                                        }}
                                    >
                                        N/A
                                    </Avatar>
                                </Tooltip>
                            )}
                        </Avatar.Group>
                    </>
                )
            },
        },
        {
            title: appString.eventCount,
            dataIndex: appKey.keyPressCount,
            key: appKey.keyPressCount,
            render: (_, record) => {
                return (
                    <div className="min-w-40 font-medium text-blue-900">
                        {`${record?.keyPressCount ?? 0} keyboard hits  •  ${record?.mouseEventCount ?? 0} mouse clicks`}
                    </div>
                );
            },
        },
        {
            title: appString.view,
            dataIndex: appKey.keyPressCount,
            key: appKey.keyPressCount,
            fixed: 'right',
            render: (_, record) => {
                return (
                    <div className="flex justify-center items-center gap-5">
                        <Tooltip title={appString.userDetail}>
                            {actionLoading === record._id ? (
                                <LoadingOutlined />
                            ) : (
                                <div className="cursor-pointer" onClick={() => handleViewClick(record)}>
                                    <User color={appColor.secondPrimary} />
                                </div>
                            )}
                        </Tooltip>
                        <Tooltip title={appString.view}>
                            <div className="cursor-pointer" onClick={() => handleViewClick(record)}>
                                <Eye color={appColor.primary} />
                            </div>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    // const openModalWithLoading = (isEditMode, record = null) => {
    //     const loadingId = isEditMode ? record._id : 'add';
    //     setActionLoading(loadingId);
    //
    //     setSelectedEmp(record);
    //     setIsEditing(isEditMode);
    //
    //     setTimeout(() => {
    //         setIsModelOpen(true);
    //         setActionLoading(null);
    //     }, 100);
    // };

    const handleViewClick = (record) => {
        router.push(`${pageRoutes.employeeDetail}?user=${record?.userData?.employeeCode}`);
    };

    const onChange = async (date, dateString) => {
        const baseUrl = endpoints.getTodayAttendance;
        let queryParams = [];

        if (dateString) {
            queryParams.push(`date=${dateString}`);
        }

        const finalUrl =
            queryParams.length > 0
                ? `${baseUrl}?${queryParams.join("&")}`
                : baseUrl;
        try {
            await apiCall({
                method: HttpMethod.GET,
                url: finalUrl,
                setIsLoading: setLoading,
                showSuccessMessage: false,
                successCallback: (data) => {
                    setAllData(data.data);
                },
            });
        } catch (error) {
            console.error("API Call Failed:", error);
        }
    };

    return (
        <>
            <EmpScreenshotModel open={isSsModelOpen} loading={false} setSsModelOpen={setSsModelOpen} screenshots={screenshots}
                                setScreenshots={setScreenshots} empID={selectedId} onClose={() => {
                // if (detailModelOpenFlag) {
                //     setDetailModelOpen(true);
                // }
            }}/>
            <div className="flex flex-row h-full">
                <Card>
                    <Table
                        rowKey={(record) => record._id}
                        loading={loading}
                        columns={columns}
                        dataSource={filteredData}
                        title={() => (
                            <div className="flex justify-between items-center gap-2 flex-wrap">
                                <DatePicker
                                    rootClassName="w-31"
                                    onChange={onChange}
                                    disabledDate={(current) => {
                                        return current && current > dayjs().endOf('day');
                                    }}
                                />
                                <Input
                                    placeholder={appString.attReportSearchHint}
                                    prefix={<Search/>}
                                    value={searchText}
                                    onChange={e => setSearchText(e.target.value)}
                                    className="w-full flex-1 max-w-90"
                                />
                            </div>
                        )}
                    />
                </Card>
                <div></div>
            </div>
        </>
    );
}
