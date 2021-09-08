import React, { useState } from "react";
import styles from "./style.less";
import { Button } from "@/component/Button";
import { Form, Input, Checkbox } from "antd";
import langservice from "@/common/core/language";

interface loginFormProps {
    onFinish?: (value: LOGIN.loginParams, remember?: boolean) => void;
}

export const LoginForm: React.FC<loginFormProps> = ({ onFinish }) => {
    const [tas] = langservice.useLanguage("login");

    const [remember, setRemeber] = useState(false);

    const submit = (value: LOGIN.loginParams) => {
        onFinish && onFinish(value, remember);
    };

    const changeRemeber = () => {
        setRemeber(!remember);
    };

    return (
        <>
            <label className={styles.title}>{tas("title")}</label>
            <Form onFinish={submit}>
                <Form.Item name={"username"} rules={[{ required: true, message: tas("username.required") }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={"password"} rules={[{ required: true, message: tas("password.required") }]}>
                    <Input type={"password"} />
                </Form.Item>

                <Form.Item>
                    <Checkbox checked={remember} onChange={changeRemeber}>
                        {tas("remember")}
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type={"primary"} htmlType={"submit"} className={styles.loginBtn}>
                        {tas("submit.btn")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
