import React, { useEffect } from "react";
import { Form } from "antd";
import { Modal } from "@/component";
import { connect } from "react-redux";
import Config from "@/common/core/config";
import { PasswordForm } from "@/component/Scenes";
import actions, { namespace } from "@/pages/Setting/user/actions";

interface changeProps extends USER.StateType {}

const changePwd: React.FC<changeProps> = ({ changePwdId }) => {
    const [form] = Form.useForm();

    const onCancel = () => {
        form.resetFields();
        actions.changeState({ changePwdId: "" });
    };

    const handleOk = () => {
        form.validateFields().then((value: Global.AUTH.passwordType) => {
            changePwdId && actions.changeUserPwd(changePwdId, value.newPassword, onCancel);
        });
    };

    return (
        <Modal
            okText={"修改"}
            title={"修改密码"}
            onCancel={onCancel}
            cancelText={"取消"}
            onOk={handleOk}
            visible={Boolean(changePwdId)}
        >
            <Form {...Config.formLayout.default} form={form}>
                <PasswordForm />
            </Form>
        </Modal>
    );
};

export const ChangePassword = connect(({ [namespace]: { changePwdId } }: { [namespace]: USER.StateType }) => ({
    changePwdId,
}))(changePwd);
