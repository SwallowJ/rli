import { Form } from "antd";
import { UserForm } from "./user";
import React, { useState } from "react";
import { Modal, Button } from "@/component";
import langservice from "@/common/core/language";
import actions from "@/pages/Setting/user/actions";

interface createProps {
    list?: Function;
}

export const CreateUser: React.FC<createProps> = ({ list }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [lang] = langservice.useLanguage("system");

    const onVisible = () => {
        setVisible(true);
    };

    const onCancel = () => {
        setVisible(false);
        form.resetFields();
    };

    const handleOK = () => {
        form.validateFields().then((value: USER.PARAMS.form) => {
            value.provider = "password";
            value.roles = [value.role];
            value.enabled = true;
            actions.create(value, () => {
                list?.();
                onCancel();
            });
        });
    };

    return (
        <>
            <Button type={"primary"} onClick={onVisible}>
                {lang("user.add")}
            </Button>
            <Modal title={lang("user.create")} visible={visible} onCancel={onCancel} onOk={handleOK}>
                <UserForm form={form} />
            </Modal>
        </>
    );
};
