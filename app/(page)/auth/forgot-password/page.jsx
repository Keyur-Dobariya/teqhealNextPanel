'use client';

import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import appString from "../../../utils/appString";
import appKey from "../../../utils/appKey";
import pageRoutes from "../../../utils/pageRoutes";

export default function SignIn() {
    const [form] = Form.useForm();
    const router = useRouter();

    const handleChange = (changedValues, allValues) => {
        console.log("allValues=>", allValues);
    };

    return (
        <div className="z-10 w-full max-w-110 p-4" style={{ marginLeft: "2px" }}>
            <div className="font-medium text-2xl xl:text-3xl">{appString.signInTitle}</div>
            <div className="w-[25px] h-[5px] rounded-xl bg-amber-500 my-2" />
            <div className="text-gray-500 text-sm mb-7 xl:text-base">{appString.signInDes}</div>
            <Form
                form={form}
                name="signin"
                onFinish={(values) => {}}
                onKeyDown={null}
                onValuesChange={handleChange}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name={appKey.emailAddress}
                    rules={[
                        { required: true, message: appString.emailAddressV1 },
                        {
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: appString.emailAddressV2,
                        },
                    ]}
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
                    rules={[
                        { required: true, message: appString.passwordV1 },
                        { pattern: /^[A-Z]/, message: appString.passwordV2 },
                        { pattern: /\d/, message: appString.passwordV3 },
                        { pattern: /[@$!%*?&]/, message: appString.passwordV4 },
                        { min: 8, message: appString.passwordV5 },
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder={appString.password}
                        type="password"
                    />
                </Form.Item>
            </Form>
            <div className="my-3 text-end cursor-pointer text-blue-700 font-semibold hover:text-blue-500">
                {appString.forgotPassword}
            </div>
            <Button type="primary" className="w-full my-2">{appString.login}</Button>
            <div className="text-gray-500 text-center my-2">
                {appString.dontAcc}
                <span
                    className="cursor-pointer text-blue-700 font-semibold hover:text-blue-500"
                    onClick={() => router.push(pageRoutes.signupPage)}
                >
                        {" "}
                    {appString.signUp}
                    </span>
            </div>
        </div>
    );
}