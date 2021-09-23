import React from "react";
import { Form } from "antd";
import { UserForm } from "./user";
import { Modal } from "@/component";
import { connect } from "react-redux";
import actions, { namespace } from "@/pages/Setting/user/actions";

interface editProps extends USER.StateType {
    list?: Function;
    title?: string;
}

const edit: React.FC<editProps> = ({ editInfo, list, title }) => {
    const [form] = Form.useForm();

    const onCancel = () => {
        form.resetFields();
        actions.changeState({ editInfo: undefined });
    };

    const handleOk = () => {
        form.validateFields().then((value: USER.PARAMS.form) => {
            value.roles = [value.role];
            actions.updata(value, () => {
                onCancel();
                list?.();
            });
        });
    };

    return (
        <Modal onOk={handleOk} title={title} onCancel={onCancel} visible={Boolean(editInfo)}>
            <UserForm form={form} initialValues={editInfo} />
        </Modal>
    );
};

export const EditUser = connect(({ [namespace]: { editInfo } }: { [namespace]: USER.StateType }) => ({
    editInfo,
}))(edit);
