import React from "react";
import { DataNode } from "antd/lib/tree";
import { Form, FormInstance } from "antd";
import Config from "@/common/core/config";
import { Input, Tree } from "@/component";
import langservice from "@/common/core/language";

interface roleProps {
    edit?: boolean;
    form?: FormInstance;
    roleName?: string;
    permTree?: DataNode[];
    permissions?: string[];
}

export const RoleInfo: React.FC<roleProps> = ({ permTree, form, edit = false, permissions, roleName }) => {
    const [lang] = langservice.useLanguage("system");
    return (
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item
                name={"roleName"}
                initialValue={roleName}
                rules={[{ required: true }]}
                label={lang("role.form.name.label")}
            >
                <Input placeholder={lang("role.placeholder.roleName")} disabled={edit} />
            </Form.Item>
            <Form.Item label={lang("role.form.permission.label")} name={"permissions"} initialValue={permissions}>
                <Tree.Controlled
                    checkable={true}
                    selectable={false}
                    treeData={permTree}
                    defaultExpandAll={true}
                    height={Config.screenHeight - 500}
                />
            </Form.Item>
        </Form>
    );
};
