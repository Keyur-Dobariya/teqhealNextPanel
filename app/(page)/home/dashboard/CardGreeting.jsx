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
import CardClockInOut from "./CardClockInOut";
import CardLiveTracking from "./CardLiveTracking";
import CardTodayActivity from "./CardTodayActivity";
import CardDashboardCommon from "./CardDashboardCommon";

export default function Page() {
    return (
        <div className="flex flex-col gap-5">

            <CardDashboardCommon />
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12} lg={12} xl={7}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <CardClockInOut />
                        </Col>
                        <Col span={24}>
                            <CardLiveTracking />
                        </Col>
                        <Col span={24}>
                            <CardTodayActivity />
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