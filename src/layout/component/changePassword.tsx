import { Dispatch } from "redux";
import { Form, Input } from "antd";
import { connect } from "react-redux";
import { Modal } from "@/component/Modal";
import action from "@/pages/Login/actions";
import { PasswordForm } from "@/component/Scenes";
import React, { useState, MouseEvent } from "react";

const __layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

interface passwordProps {
    dispatch: Dispatch;
}

const password: React.FC<passwordProps> = ({ children, dispatch }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);

    const onClick = () => {
        setVisible(true);
    };

    const onCancel = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setVisible(false);
        form.resetFields();
    };

    const handleOK = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        form.validateFields().then((payload: Global.AUTH.changePwdType) => {
            dispatch({
                type: "AUTH/changePassword",
                payload,
                callback: () => {
                    dispatch(action.logout());
                },
            });
        });
    };

    return (
        <div onClick={onClick}>
            {children}
            <Modal visible={visible} title={"修改密码"} onCancel={onCancel} onOk={handleOK}>
                <Form {...__layout} form={form}>
                    <Form.Item
                        label={"当前密码"}
                        name={"currentPassword"}
                        rules={[{ required: true, message: "请输入当前密码" }]}
                    >
                        <Input.Password placeholder={"请输入当前密码"} />
                    </Form.Item>
                    <PasswordForm depends={"currentPassword"} />
                </Form>
            </Modal>
        </div>
    );
};

export const ChangePassword = connect()(password);
