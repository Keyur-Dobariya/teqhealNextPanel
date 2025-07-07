'use client';

import {Avatar, Button, Card, Col, Divider, Layout, Row, Timeline} from "antd";
import {appColor, getDarkColor, getLightColor, getTransColor} from "../../../utils/appColor";
import {
    UserOutlined,
    SmileOutlined,
    GithubOutlined,
    UserDeleteOutlined,
    UserAddOutlined,
    ClockCircleOutlined,
    FieldTimeOutlined,
    HistoryOutlined,
    LogoutOutlined,
    LoginOutlined,
    CoffeeOutlined,
    FallOutlined,
    DashboardOutlined,
    CaretRightOutlined,
    LineChartOutlined,
    StockOutlined,
    PauseOutlined,
} from "@ant-design/icons";
import appKey from "../../../utils/appKey";
import imagePaths from "../../../utils/imagesPath";
import appString from "../../../utils/appString";
import {getLocalData, isAdmin} from "../../../dataStorage/DataPref";
import {useEffect, useState} from "react";
import {LoadingComponent} from "../../../components/LoadingComponent";
import {useAppData} from "../../../masterData/AppDataContext";
import {useLoading} from "../../../layout";

export default function Page() {

    const {dashboardData, loginUserData} = useAppData();

    const [isBreakIn, setIsBreakIn] = useState(false);
    const [isClockIn, setIsClockIn] = useState(false);
    const [isTrackingOn, setIsTrackingOn] = useState(false);

    const CommonGridBox = ({title, value, color, icon}) => {
        return (
            <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                <Card>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 min-w-9 min-h-9 rounded-full flex justify-center items-center"
                             style={{backgroundColor: getTransColor(color)}}>
                            {icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[17px] font-medium" style={{color: appColor.primary}}>{value}</div>
                            <div className="text-[13px] text-gray-500 truncate" title={title}>{title}</div>
                        </div>
                    </div>
                </Card>
            </Col>
        );
    }

    const CommonTimelineIcon = ({icon}) => {
        return (
            <div
                className="flex mt-1 p-1 items-center justify-center rounded-full border-[1px] border-gray-200 bg-white">
                {icon}
            </div>
        );
    };

    const CommonTimelineContent = ({time, content, icon, marginBottom}) => {
        return (
            <div
                className="flex py-[6px] px-[10px] items-center justify-between rounded-lg border-[1px] border-gray-200 bg-gray-50/50"
                style={{marginBottom: marginBottom || "15px"}}>
                <div className="flex flex-col">
                    <div className="text-gray-900 text-[13px] font-medium">{time}</div>
                    <div className="text-gray-500 text-[12px]">{content}</div>
                </div>
                {icon}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-5">
            <Card>
                <div className="flex items-center gap-3">
                    <div className="rounded-full p-[1px] shadow-md"
                         style={{border: `1px solid ${getDarkColor(getLocalData(appKey.fullName))}`}}>
                        <Avatar src={getLocalData(appKey.profilePhoto)} size={50}/>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 gap-1">
                        <div className="flex items-center text-[17px] font-medium gap-2">
                            <div>{appString.hey},</div>
                            <div>{getLocalData(appKey.fullName)}</div>
                            <img src={imagePaths.heyWaveHand} alt="hey" width={22} height={22}/>
                        </div>
                        <div className="text-[13px] text-gray-500 truncate">{appString.motiveLine}</div>
                    </div>
                </div>
            </Card>
            {isAdmin() ?
                <Row gutter={[16, 16]}>
                    <CommonGridBox
                        title="Total Employees"
                        value={dashboardData?.employeeUsers || 0}
                        color="A"
                        icon={<UserOutlined style={{color: getDarkColor("A"), fontSize: 18}}/>}/>
                    <CommonGridBox
                        title="Total Admins"
                        value={dashboardData?.adminUsers || 0}
                        color="V"
                        icon={<UserOutlined style={{color: getDarkColor("V"), fontSize: 18}}/>}/>
                    <CommonGridBox
                        title="Today Present"
                        value={dashboardData?.todayPresent || 0}
                        color="C"
                        icon={<UserAddOutlined style={{color: getDarkColor("C"), fontSize: 18}}/>}/>
                    <CommonGridBox
                        title="Today Absent"
                        value={dashboardData?.todayAbsent || 0}
                        color="D"
                        icon={<UserDeleteOutlined style={{color: getDarkColor("D"), fontSize: 18}}/>}/>
                    <CommonGridBox
                        title="No. Of Clients"
                        value={dashboardData?.noOfClients || 0}
                        color="E"
                        icon={<SmileOutlined style={{color: getDarkColor("E"), fontSize: 18}}/>}/>
                    <CommonGridBox
                        title="No. Of Projects"
                        value={dashboardData?.noOfProjects || 0}
                        color="F"
                        icon={<GithubOutlined style={{color: getDarkColor("F"), fontSize: 18}}/>}/>
                </Row> :
                <Row gutter={[16, 16]}>
                    <CommonGridBox
                        title="Today Working Hours"
                        value={dashboardData?.todayWorkingHours || 0}
                        color="A"
                        icon={<ClockCircleOutlined style={{color: getDarkColor("A"), fontSize: 18}}/>}/>
                    <CommonGridBox
                        title="Weekly Hours"
                        value={dashboardData?.weeklyHours || 0}
                        color="V"
                        icon={<HistoryOutlined style={{color: getDarkColor("V"), fontSize: 18}}/>}/>
                    <CommonGridBox
                        title="Monthly Hours"
                        value={dashboardData?.monthlyHours || 0}
                        color="C"
                        icon={<FieldTimeOutlined style={{color: getDarkColor("C"), fontSize: 18}}/>}/>
                    <CommonGridBox
                        title="Monthly Late Arrival"
                        value={dashboardData?.monthlyLateArrivalHours || 0}
                        color="D"
                        icon={<FallOutlined style={{color: getDarkColor("D"), fontSize: 18}}/>}/>
                    <CommonGridBox
                        title="Monthly Overtime Hours"
                        value={dashboardData?.monthlyOvertimeHours || 0}
                        color="E"
                        icon={<SmileOutlined style={{color: getDarkColor("E"), fontSize: 18}}/>}/>
                    <CommonGridBox
                        title="Monthly Absent Count"
                        value={dashboardData?.monthlyAbsentCount || 0}
                        color="F"
                        icon={<UserDeleteOutlined style={{color: getDarkColor("F"), fontSize: 18}}/>}/>
                </Row>
            }
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12} lg={12} xl={7}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2">
                                        <ClockCircleOutlined style={{color: appColor.secondPrimary, fontSize: "16px"}}/>
                                        <div className="font-[550] text-[15px]">{appString.clockInOut}</div>
                                    </div>
                                    <div
                                        className="p-3 flex items-center bg-blue-50/50 border-[1px] rounded-lg border-blue-100">
                                        <div className="flex-1 flex flex-col justify-center items-center">
                                            <div className="font-[550] text-[15px]">04:15:06</div>
                                            <div
                                                className="text-[13px] font-medium text-gray-500">{appString.totalTime}</div>
                                        </div>
                                        <div className="w-[1px] h-10 bg-blue-100"/>
                                        <div className="flex-1 flex flex-col justify-center items-center">
                                            <div className="font-[550] text-[15px]">00:15:45</div>
                                            <div
                                                className="text-[13px] font-medium text-gray-500">{appString.breakTime}</div>
                                        </div>
                                    </div>
                                    <div
                                        className="px-3 py-[5px] flex justify-between items-center bg-red-50/50 border-[1px] rounded-lg border-red-100">
                                        <div className="font-medium text-[14px]">Punch In At</div>
                                        <div className="font-[550] text-[14px]">09:20 AM</div>
                                    </div>
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <Button className="w-full" color="danger"
                                                    variant={isBreakIn ? "solid" : "outlined"}
                                                    icon={<CoffeeOutlined/>}
                                                    onClick={() => {
                                                        setIsBreakIn(!isBreakIn);
                                                    }}>
                                                {isBreakIn ? appString.breakOut : appString.breakIn}
                                            </Button>
                                        </Col>
                                        <Col span={12}>
                                            <Button className="w-full" color="primary"
                                                    variant={isClockIn ? "solid" : "outlined"}
                                                    icon={isClockIn ? <LogoutOutlined rotate={180}/> : <LoginOutlined/>}
                                                    onClick={() => {
                                                        setIsClockIn(!isClockIn);
                                                    }}>
                                                {isClockIn ? appString.clockOut : appString.clockIn}
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2">
                                        <DashboardOutlined style={{color: appColor.secondPrimary, fontSize: "16px"}}/>
                                        <div className="font-[550] text-[15px]">{appString.liveTracking}</div>
                                    </div>
                                    <Row gutter={[16, 16]}>
                                        <Col span={11}>
                                            <Button className="w-full" color="geekblue" variant="filled"
                                                    icon={<ClockCircleOutlined/>}>00:00:00</Button>
                                        </Col>
                                        <Col span={13}>
                                            <Button className="w-full" color="green"
                                                    variant={isTrackingOn ? "solid" : "outlined"}
                                                    icon={isTrackingOn ? <PauseOutlined/> : <CaretRightOutlined/>}
                                                    onClick={() => {
                                                        setIsTrackingOn(!isTrackingOn);
                                                    }}>
                                                {isTrackingOn ? appString.stopTracking : appString.startTracking}
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2">
                                        <StockOutlined style={{color: appColor.secondPrimary, fontSize: "16px"}}/>
                                        <div className="font-[550] text-[15px]">{appString.todayActivity}</div>
                                    </div>
                                    <Timeline
                                        style={{margin: "5px 5px 0 5px"}}
                                        items={[
                                            {
                                                color: appColor.secondPrimary,
                                                dot: (
                                                    <CommonTimelineIcon
                                                        icon={<LoginOutlined style={{fontSize: '16px'}}/>}/>
                                                ),
                                                children: (
                                                    <CommonTimelineContent time={"09:30 AM"} content={"Clock In"}
                                                                           icon={<SmileOutlined/>}/>
                                                ),
                                            },
                                            {
                                                color: appColor.danger,
                                                dot: (
                                                    <CommonTimelineIcon
                                                        icon={<CoffeeOutlined style={{fontSize: '16px'}}/>}/>
                                                ),
                                                children: (
                                                    <CommonTimelineContent time={"01:00 PM"} content={"Break In"}
                                                                           icon={<SmileOutlined/>}/>
                                                ),
                                            },
                                            {
                                                color: appColor.danger,
                                                dot: (
                                                    <CommonTimelineIcon
                                                        icon={<CoffeeOutlined style={{fontSize: '16px'}}/>}/>
                                                ),
                                                children: (
                                                    <CommonTimelineContent time={"01:45 PM"} content={"Break Out"}
                                                                           icon={<SmileOutlined/>}/>
                                                ),
                                            },
                                            {
                                                color: appColor.secondPrimary,
                                                dot: (
                                                    <CommonTimelineIcon icon={<LogoutOutlined rotate={180}
                                                                                              style={{fontSize: '16px'}}/>}/>
                                                ),
                                                children: (
                                                    <CommonTimelineContent time={"06:30 PM"} content={"Clock Out"}
                                                                           marginBottom={"0px"}
                                                                           icon={<SmileOutlined/>}/>
                                                ),
                                            },
                                        ]}
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12} lg={12} xl={17}>
                    <Card>
                        <div className="flex items-center gap-3">
                            <div className="rounded-full p-[1px] shadow-md"
                                 style={{border: `1px solid ${getDarkColor(getLocalData(appKey.fullName))}`}}>
                                <Avatar src={getLocalData(appKey.profilePhoto)} size={50}/>
                            </div>
                            <div className="flex flex-col flex-1 min-w-0 gap-1">
                                <div className="flex items-center text-[17px] font-medium gap-2">
                                    <div>{appString.hey},</div>
                                    <div>{getLocalData(appKey.fullName)}</div>
                                    <img src={imagePaths.heyWaveHand} alt="hey" width={22} height={22}/>
                                </div>
                                <div className="text-[13px] text-gray-500 truncate">{appString.motiveLine}</div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}