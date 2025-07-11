'use client';

import {useEffect, useMemo, useState} from 'react';
import {
    Avatar,
    Button, Card,
    Grid,
    Input,
    Popconfirm,
    Switch,
    Table,
    Tooltip,
} from 'antd';
import {Search} from '../../../utils/icons';
import {UserPlus, Edit, Trash2, Eye, XCircle, CheckCircle} from '../../../utils/icons';
import {useAppData, AppDataFields} from '../../../masterData/AppDataContext';
import apiCall, {HttpMethod} from '../../../api/apiServiceProvider';
import {endpoints} from '../../../api/apiEndpoints';
import appString from '../../../utils/appString';
import appKeys from '../../../utils/appKey';
import {ApprovalStatus, DateTimeFormat} from '../../../utils/enum';
import {appColor} from '../../../utils/appColor';
import dayjs from 'dayjs';
import {profilePhotoManager} from "../../../utils/utils";
import EmpAddUpdateModel from "../../../models/EmpAddUpdateModel";
import {LoadingOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import pageRoutes from "../../../utils/pageRoutes";

const {useBreakpoint} = Grid;

export default function Page() {
    const {usersData, updateAppDataField} = useAppData();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const router = useRouter();

    const [allData, setAllData] = useState(usersData);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [loadingUsers, setLoadingUsers] = useState({});
    const [selectedEmp, setSelectedEmp] = useState(null);

    useEffect(() => {
        setAllData(usersData);
    }, [usersData]);

    const filteredData = useMemo(() => {
        if (!allData) return [];
        const query = searchText.toLowerCase();
        return allData.filter(
            data =>
                data.approvalStatus === ApprovalStatus.Approved &&
                (
                    data.fullName?.toLowerCase().includes(query) ||
                    data.emailAddress?.toLowerCase().includes(query) ||
                    data.mobileNumber?.includes(query) ||
                    data.role?.toLowerCase().includes(query) ||
                    data.employeeCode?.toLowerCase().includes(query)
                )
        );
    }, [allData, searchText]);

    const updateUser = async (id, data) => {
        setLoading(true);
        try {
            await apiCall({
                method: HttpMethod.POST,
                url: `${endpoints.addUpdateUser}${id}`,
                data,
                successCallback: res => {
                    updateAppDataField(AppDataFields.usersData, res?.data);
                },
            });
        } catch (err) {
            console.error('Update failed', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (record) => {
        setLoading(true);
        try {
            await apiCall({
                method: HttpMethod.DELETE,
                url: `${endpoints.deleteUser}${record._id}`,
                successCallback: res => {
                    updateAppDataField(AppDataFields.usersData, res?.data);
                },
            });
        } catch (err) {
            console.error('Delete failed', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleUserStatus = async (user, checked) => {
        setLoadingUsers(prev => ({...prev, [user._id]: true}));
        await updateUser(user._id, {isActive: checked});
        setLoadingUsers(prev => ({...prev, [user._id]: false}));
    };

    const openModalWithLoading = (isEditMode, record = null) => {
        const loadingId = isEditMode ? record._id : 'add';
        setActionLoading(loadingId);

        setSelectedEmp(record);
        setIsEditing(isEditMode);

        setTimeout(() => {
            setIsModelOpen(true);
            setActionLoading(null);
        }, 100);
    };


    const handleAddClick = () => {
        openModalWithLoading(false);
    };

    const handleEditClick = (record) => {
        openModalWithLoading(true, record);
    };

    const handleViewClick = (record) => {
        router.push(`${pageRoutes.employeeDetail}?user=${record.employeeCode}`);
    };

    const handleSuccess = (updatedUser) => {
        updateAppDataField(AppDataFields.usersData, updatedUser);
        setIsModelOpen(false);
    };

    const columns = [
        {
            title: appString.empCode,
            dataIndex: appKeys.employeeCode,
            key: appKeys.employeeCode,
            align: 'center',
        },
        {
            title: appString.fullName,
            dataIndex: appKeys.fullName,
            key: appKeys.fullName,
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
            render: (text, record) => (
                <div className="flex items-center gap-2">
                    <Avatar src={profilePhotoManager({url: record.profilePhoto, gender: record.gender})} size="default" />
                    <div className="flex-1 font-medium">{record.fullName}</div>
                </div>
            ),
        },
        {
            title: appString.emailAddress,
            dataIndex: appKeys.emailAddress,
            key: appKeys.emailAddress,
            sorter: (a, b) => a.emailAddress.localeCompare(b.emailAddress),
        },
        {
            title: appString.mobileNumber,
            dataIndex: appKeys.mobileNumber,
            key: appKeys.mobileNumber,
            align: 'center',
        },
        {
            title: appString.dateOfBirth,
            dataIndex: appKeys.dateOfBirth,
            key: appKeys.dateOfBirth,
            align: 'center',
            render: dob => dob ? dayjs(dob).format(DateTimeFormat.DDMMMMYYYY) : 'N/A',
        },
        {
            title: appString.role,
            dataIndex: appKeys.role,
            key: appKeys.role,
            align: 'center',
            sorter: (a, b) => a.role?.localeCompare(b.role),
        },
        {
            title: appString.status,
            key: 'status',
            align: 'center',
            render: (_, user) => (
                <Switch
                    size="small"
                    loading={!!loadingUsers[user._id]}
                    checked={user.isActive}
                    onChange={checked => toggleUserStatus(user, checked)}
                />
            ),
        },
        {
            title: appString.action,
            key: 'actions',
            align: 'center',
            fixed: 'right',
            width: 120,
            render: (_, record) => (
                <div className="flex justify-center items-center gap-3">
                    <Tooltip title={appString.edit}>
                        {actionLoading === record._id ? (
                            <LoadingOutlined />
                        ) : (
                            <div onClick={() => handleEditClick(record)} style={{cursor: 'pointer'}}>
                                <Edit color={appColor.secondPrimary} />
                            </div>
                        )}
                    </Tooltip>
                    <Popconfirm title={appString.deleteConfirmation} onConfirm={() => deleteUser(record)}>
                        <Tooltip title={appString.delete}>
                            <Trash2 color={appColor.danger} style={{cursor: 'pointer'}}/>
                        </Tooltip>
                    </Popconfirm>
                    <Tooltip title={appString.view}>
                        <div onClick={() => handleViewClick(record)} style={{cursor: 'pointer'}}>
                            <Eye color={appColor.primary} />
                        </div>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <>
            <Card>
                <Table
                    rowKey={(record) => record._id}
                    loading={loading}
                    columns={columns}
                    dataSource={filteredData}
                    title={() => (
                        <div className="flex justify-between items-center gap-2 flex-wrap">
                            <Input
                                placeholder={appString.empSearchHint}
                                prefix={<Search/>}
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                                className="w-full flex-1 max-w-90"
                            />
                            <Button
                                type="primary"
                                icon={<UserPlus/>}
                                onClick={handleAddClick}
                                loading={actionLoading === 'add'}
                            >
                                {!isMobile && appString.addEmployee}
                            </Button>
                        </div>
                    )}
                />
            </Card>
            {isModelOpen && (
                <EmpAddUpdateModel
                    isModelOpen={isModelOpen}
                    setIsModelOpen={setIsModelOpen}
                    employeeData={selectedEmp}
                    isEditing={isEditing}
                    onSuccessCallback={handleSuccess}
                />
            )}
        </>
    );
}
