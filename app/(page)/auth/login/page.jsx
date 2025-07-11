'use client';

import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import appString from "../../../utils/appString";
import appKey from "../../../utils/appKey";
import pageRoutes from "../../../utils/pageRoutes";
import AnimatedDiv, {Direction} from "../../../components/AnimatedDiv";
import {useEffect, useState} from "react";
import apiCall, {HttpMethod} from "../../../api/apiServiceProvider";
import {storeLoginData} from "../../../dataStorage/DataPref";
import {endpoints, environment} from "../../../api/apiEndpoints";
import validationRules from "../../../utils/validationRules";
import {detectPlatform} from "../../../utils/utils";

export default function SignIn() {
    const [form] = Form.useForm();
    const router = useRouter();
    const [isElectron, setIsElectron] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const detected = detectPlatform(userAgent);
        setIsElectron(detected.isElectron)
    }, []);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        form.setFieldsValue({
            emailAddress: 'admin@gmail.com',
            password: 'Admin@123'
        })
    }, []);

    const onFormSubmit = async () => {
        try {
            await form.validateFields();

            const formData = form.getFieldsValue();
            await apiCall({
                method: HttpMethod.POST,
                url: endpoints.login,
                data: formData,
                setIsLoading: setLoading,
                successCallback: (data) => {
                    form.resetFields();
                    storeLoginData(data, true);

                    if(isElectron) {
                        router.push(pageRoutes.tracker);
                    } else {
                        router.push(pageRoutes.dashboard);
                    }

                    if (window.electronAPI) {
                        console.log("Send Login Data=>", data);
                        window.electronAPI.sendLoginData(data);
                    }
                },
            });
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedDiv className={`z-10 w-full p-4 ${isElectron ? "max-w-90" : "max-w-110"}`} style={{ marginLeft: "2px" }} direction={Direction.TOP_TO_BOTTOM}>
            <div className="font-medium text-2xl xl:text-3xl">{appString.signInTitle}</div>
            <div className="w-[25px] h-[5px] rounded-xl bg-amber-500 my-2" />
            <div className="text-gray-500 text-sm mb-7 xl:text-base">{appString.signInDes}</div>
            <Form
                form={form}
                name="signin"
                onKeyDown={null}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name={appKey.emailAddress}
                    rules={validationRules[appKey.emailAddress]}
                    hasFeedback
                >
                    <Input
                        prefix={<MailOutlined />}
                        maxLength={100}
                        placeholder={appString.emailAddress}
                        inputMode="email"
                        type="email"
                    />
                </Form.Item>
                <Form.Item
                    name={appKey.password}
                    rules={validationRules[appKey.password]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder={appString.password}
                        type="password"
                    />
                </Form.Item>
            </Form>
            <div className="my-3 text-end cursor-pointer text-blue-700 font-semibold hover:text-blue-500" onClick={() => {
                router.push(pageRoutes.forgotPasswordPage);
                // router.push({
                //     pathname: pageRoutes.forgotPasswordPage,
                //     query: { data: JSON.stringify({ [appKey.emailAddress]: form.getFieldValue(appKey.emailAddress) }) },
                // });
            }}>
                {appString.forgotPassword}
            </div>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full my-2" onClick={onFormSubmit}>{appString.login}</Button>
            {!isElectron && <div className="text-gray-500 text-center my-2">
                {appString.dontAcc}
                <span
                    className="cursor-pointer text-blue-700 font-semibold hover:text-blue-500"
                    onClick={() => {
                        router.push(pageRoutes.signupPage);
                        // const signupUrl = `${environment.webBaseUrl}${pageRoutes.signupPage}`;
                        //
                        // if (typeof window !== 'undefined' &&
                        //     window.electronAPI &&
                        //     typeof window.electronAPI.openExternalLink === 'function'
                        // ) {
                        //     window.electronAPI.openExternalLink("http://localhost:3000/auth/signup");
                        // } else {
                        //     // Fallback for normal browsers
                        //     window.open("http://localhost:3000/auth/signup", '_blank');
                        // }
                    }}
                >
                        {" "}
                    {appString.signUp}
                    </span>
            </div>}
        </AnimatedDiv>
    );
}