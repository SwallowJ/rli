import { Form } from "antd";
import { RoleInfo } from "./role";
import React, { useState } from "react";
import { DataNode } from "antd/lib/tree";
import { Button, Modal } from "@/component";
import actions from "@/pages/Setting/role/actions";

interface createProps {
    updata?: Function;
    permTree?: DataNode[];
}

export const CreateRole: React.FC<createProps> = ({ permTree, updata }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);

    const onVisible = () => {
        setVisible(true);
    };

    const onCancel = () => {
        setVisible(false);
    };

    const handleOK = () => {
        form.validateFields().then((value: ROLE.PARAMS.roleForm) => {
            const { roleName, permissions } = value;
            const root = permTree?.map((x) => x.key) || [];
            const data: ROLE.PARAMS.create = {
                newRole: {
                    roleName,
                    roleType: "1",
                    roleDesc: roleName,
                },
                permissions: permissions.filter((p: string) => !root.includes(p)),
            };

            actions.create(data, () => {
                updata?.();
                onCancel();
            });
        });
    };

    return (
        <>
            <Button type={"primary"} onClick={onVisible}>
                {"+添加角色"}
            </Button>
            <Modal
                okText={"创建"}
                visible={visible}
                title={"创建角色"}
                maskClosable={false}
                onCancel={onCancel}
                onOk={handleOK}
            >
                <RoleInfo form={form} permTree={permTree} />
            </Modal>
        </>
    );
};
