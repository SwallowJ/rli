import React from "react";
import { Form, Input, Button } from "antd";

interface loginFormProps {
    onFinish: (value: LOGIN.loginParams) => void;
}

export const LoginForm: React.FC<loginFormProps> = ({ onFinish }) => {
    return (
        <Form onFinish={onFinish}>
            <Form.Item name={"userName"}>
                <Input />
            </Form.Item>

            <Form.Item name={"password"}>
                <Input type={"password"} />
            </Form.Item>

            <Form.Item>
                <Button type={"primary"} htmlType={"submit"}>
                    {"登录"}
                </Button>
            </Form.Item>
        </Form>
    );
};
