import { connect, useDispatch } from "react-redux";
import React, { Key, useState } from "react";
import { Form } from "antd";
import { Button, Modal, Input, Tree } from "@/component";
import actions from "@/pages/Setting/role/actions";
import { DataNode } from "antd/lib/tree";
import style from "../style.less";
import Config from "@/common/core/config";

interface createProps {
    updata?: Function;
    permTree?: DataNode[];
}

export const CreateRole: React.FC<createProps> = ({ permTree, updata }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const onVisible = () => {
        setVisible(true);
    };

    const onCancel = () => {
        setVisible(false);
    };

    const handleOK = () => {
        form.validateFields().then((value) => {
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
            dispatch(
                actions.create(data, () => {
                    updata?.();
                    onCancel();
                })
            );
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
                <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                    <Form.Item
                        label={"角色名称"}
                        name={"roleName"}
                        rules={[{ required: true, message: "请输入角色名" }]}
                    >
                        <Input placeholder={"请输入角色名"} />
                    </Form.Item>
                    <Form.Item label={"权限管理"} name={"permissions"}>
                        <Tree.Controlled
                            checkable={true}
                            treeData={permTree}
                            selectable={false}
                            defaultExpandAll={true}
                            height={Config.screenHeight - 500}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
