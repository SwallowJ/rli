import React from "react";
import { DataNode } from "antd/lib/tree";
import { Form, FormInstance } from "antd";
import Config from "@/common/core/config";
import { Input, Tree } from "@/component";

interface roleProps {
    edit?: boolean;
    form?: FormInstance;
    roleName?: string;
    permTree?: DataNode[];
    permissions?: string[];
}

export const RoleInfo: React.FC<roleProps> = ({ permTree, form, edit = false, permissions, roleName }) => {
    return (
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item
                label={"角色名称"}
                name={"roleName"}
                initialValue={roleName}
                rules={[{ required: true, message: "请输入角色名" }]}
            >
                <Input placeholder={"请输入角色名"} disabled={edit} />
            </Form.Item>
            <Form.Item label={"权限管理"} name={"permissions"} initialValue={permissions}>
                <Tree.Controlled
                    checkable={true}
                    treeData={permTree}
                    selectable={false}
                    defaultExpandAll={true}
                    height={Config.screenHeight - 500}
                />
            </Form.Item>
        </Form>
    );
};
