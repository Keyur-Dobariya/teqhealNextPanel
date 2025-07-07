'use client';

import {Avatar, Button, Card, Col, List, Pagination, Row, Table} from "antd";
import {appColor, colorMap} from "../../../utils/appColor";
import {
    LineChartOutlined,
    CaretRightOutlined,
    PauseOutlined,
} from "@ant-design/icons";
import appString from "../../../utils/appString";
import {useState} from "react";
import {AlertTriangle, Clock, Watch} from "../../../utils/icons";
import dayjs from "dayjs";
import {DateTimeFormat} from "../../../utils/enum";
import {colorTag} from "../../../components/CommonComponents";
import {endpoints} from "../../../api/apiEndpoints";
import {getLocalData} from "../../../dataStorage/DataPref";
import appKey from "../../../utils/appKey";
import {useAppData} from "../../../masterData/AppDataContext";
import apiCall, {HttpMethod} from "../../../api/apiServiceProvider";

export default function CardAttendanceReport() {
    const {attendancesData} = useAppData();
    const [empReportData, setEmpReportData] = useState(attendancesData);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const paginatedData = [...empReportData].reverse().slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const empReportTableColumn = () => [
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            align: 'center',
            render: (createdAt) => {
                if (!createdAt) return "-";
                return dayjs(createdAt).format(DateTimeFormat.DDMMMMYYYY);
            },
        },
        {
            title: "Total Hours",
            dataIndex: "totalHours",
            key: "totalHours",
            align: 'center',
            render: (totalHours) => {
                return colorTag(totalHours, appColor.secondPrimary);
            },
        },
        {
            title: "Working Hours",
            dataIndex: "workingHours",
            key: "workingHours",
            align: 'center',
            render: (workingHours) => {
                return colorTag(workingHours, appColor.success);
            },
        },
        {
            title: "Break Hours",
            dataIndex: "breakHours",
            key: "breakHours",
            align: 'center',
            render: (breakHours) => {
                return colorTag(breakHours, appColor.danger);
            },
        },
        {
            title: "Late Arrival",
            dataIndex: "lateArrival",
            key: "lateArrival",
            align: 'center',
            render: (lateArrival) => {
                return colorTag(lateArrival, appColor.warning);
            },
        },
        {
            title: "Overtime",
            dataIndex: "overtime",
            key: "overtime",
            align: 'center',
            render: (overtime) => {
                return colorTag(overtime, appColor.info);
            },
        },
    ];

    const getEmpReportData = async () => {
        try {
            const baseUrl = `${endpoints.userWiseAttendanceData}${getLocalData(
                appKey._id
            )}`;
            let queryParams = [];

            if (startDate) {
                queryParams.push(`startDate=${startDate}`);
            }
            if (endDate) {
                queryParams.push(`endDate=${endDate}`);
            }

            const finalUrl =
                queryParams.length > 0
                    ? `${baseUrl}?${queryParams.join("&")}`
                    : baseUrl;

            await apiCall({
                method: HttpMethod.GET,
                url: finalUrl,
                setIsLoading,
                showSuccessMessage: false,
                successCallback: (data) => {
                    setEmpReportData(data?.data);
                },
            });
        } catch (error) {
            console.error("API Call Failed:", error);
        }
    };

    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1]);
            getEmpReportData();
        }
    };

    return (
        <div>
            <Table
                pagination={false}
                columns={empReportTableColumn()}
                dataSource={paginatedData}
                scroll={{ x: "max-content", y: 280 }}
                style={{ scrollbarWidth: "none" }}
                loading={isLoading}
                bordered
                title={() => (
                    <div className="flex items-center gap-2">
                        <LineChartOutlined style={{color: colorMap.F}} />
                        <div className="font-[550] text-[15px]">{appString.attendanceReport}</div>
                    </div>
                )}
                // footer={() => (
                //     <div className="flex justify-center">
                //         <Pagination
                //             current={currentPage}
                //             pageSize={pageSize}
                //             size="small"
                //             total={empReportData.length}
                //             onChange={(page, size) => {
                //                 setCurrentPage(page);
                //                 setPageSize(size);
                //             }}
                //             showSizeChanger={false}
                //         />
                //     </div>
                // )}
            />
        </div>
    );
}