import React from "react";
import styles from "./style.less";
import { Form, Input, Button } from "antd";
import langservice from "@/common/core/language";

interface loginFormProps {
    onFinish: (value: LOGIN.loginParams) => void;
}

export const LoginForm: React.FC<loginFormProps> = ({ onFinish }) => {
    const [tas] = langservice.useLanguage("common");
    return (
        <>
            <label className={styles.title}>{tas("login")}</label>
            <Form onFinish={onFinish}>
                <Form.Item name={"username"} rules={[{ required: true, message: "请输入用户名" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={"password"} rules={[{ required: true, message: "请输入密码" }]}>
                    <Input type={"password"} />
                </Form.Item>

                <Form.Item>
                    <Button type={"primary"} htmlType={"submit"} className={styles.loginBtn}>
                        {"登录"}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
