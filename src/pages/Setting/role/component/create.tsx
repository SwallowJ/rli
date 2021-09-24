import { Form } from "antd";
import { RoleInfo } from "./role";
import React, { useState } from "react";
import { DataNode } from "antd/lib/tree";
import { Button, Modal } from "@/component";
import langservice from "@/common/core/language";
import actions from "@/pages/Setting/role/actions";

interface createProps {
    updata?: Function;
    permTree?: DataNode[];
}

export const CreateRole: React.FC<createProps> = ({ permTree, updata }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [lang] = langservice.useLanguage("system");

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
                {lang("role.create")}
            </Button>
            <Modal
                onOk={handleOK}
                visible={visible}
                onCancel={onCancel}
                maskClosable={false}
                title={lang("role.create.title")}
            >
                <RoleInfo form={form} permTree={permTree} />
            </Modal>
        </>
    );
};
