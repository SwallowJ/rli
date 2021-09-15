import styles from "./style.less";
import { Button } from "@/component";
import { Form, Input, Checkbox } from "antd";
import security from "@/common/core/security";
import langservice from "@/common/core/language";
import React, { useEffect, useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

interface loginFormProps extends LOGIN.StateType {
    onFinish?: (value: LOGIN.loginParams, remember?: boolean) => void;
}

export const LoginForm: React.FC<loginFormProps> = ({ onFinish }) => {
    const [tas] = langservice.useLanguage("login");
    const [form] = Form.useForm();
    const [remember, setRemeber] = useState(false);

    const submit = (value: LOGIN.loginParams) => {
        onFinish && onFinish(value, remember);
    };

    const changeRemeber = () => {
        setRemeber(!remember);
    };

    useEffect(() => {
        if (security.isRemember()) {
            setRemeber(true);
        }

        const userInfo = security.getRememberInfo();
        userInfo && form.setFieldsValue(userInfo);
    }, []);

    return (
        <>
            <label className={styles.title}>{tas("title")}</label>
            <Form onFinish={submit} form={form}>
                <Form.Item name={"username"} rules={[{ required: true, message: tas("username.required") }]}>
                    <Input
                        prefix={<UserOutlined style={{ color: "#00000073" }} />}
                        allowClear={true}
                        placeholder={tas("placeholder.username")}
                    />
                </Form.Item>

                <Form.Item name={"password"} rules={[{ required: true, message: tas("password.required") }]}>
                    <Input.Password
                        type={"password"}
                        prefix={<LockOutlined style={{ color: "#00000073" }} />}
                        placeholder={tas("placeholder.password")}
                    />
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
