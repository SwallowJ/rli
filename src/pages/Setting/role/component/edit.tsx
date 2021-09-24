import { Form } from "antd";
import { RoleInfo } from "./role";
import { Modal } from "@/component";
import { connect } from "react-redux";
import { DataNode } from "antd/lib/tree";
import { isEqual } from "@/utils/functools";
import React, { useEffect, useMemo } from "react";
import actions, { namespace } from "@/pages/Setting/role/actions";

interface editProps extends ROLE.StateType {
    title?: string;
    updata?: Function;
    permTree?: DataNode[];
}

const _abandon_perm = [
    "XC_PROJECT_INNER_READ",
    "XC_PROJECT_INNER_SET",
    "XC_PROJECT_INNER_UPDATE",
    "XC_PROJECT_INNER_TASK_FILE",
    "XC_PROJECT_INNER_TASK_SET",
];

const editRoleComponent: React.FC<editProps> = ({ updata, permTree, editRole, title }) => {
    const [form] = Form.useForm();

    const onCancel = () => {
        actions.changeState({ editRole: null });
    };

    const rolePerm = useMemo(
        () => editRole?.permissions.map((p) => p.permission).filter((p) => !_abandon_perm.includes(p)),
        [editRole]
    );

    const handleOk = () => {
        form.validateFields()
            .then((value: ROLE.PARAMS.roleForm) => {
                const root = permTree?.map((x) => x.key) || [];
                return value.permissions.filter((p: string) => !root.includes(p));
            })
            .then((permissions) => {
                if (isEqual({ obj1: rolePerm, obj2: permissions })) {
                    onCancel();
                    return;
                }
                actions.updataPermissions(editRole!.roleName, permissions, () => {
                    updata?.();
                    onCancel();
                });
            });
    };

    useEffect(() => {
        editRole && form.resetFields();
    }, [editRole]);

    return (
        <Modal onOk={handleOk} onCancel={onCancel} title={title} visible={Boolean(editRole?.roleName)}>
            <RoleInfo
                form={form}
                edit={true}
                permTree={permTree}
                permissions={rolePerm}
                roleName={editRole?.roleDesc}
            />
        </Modal>
    );
};

export const EditRole = connect(({ [namespace]: { editRole } }: { [namespace]: ROLE.StateType }) => ({ editRole }))(
    editRoleComponent
);
