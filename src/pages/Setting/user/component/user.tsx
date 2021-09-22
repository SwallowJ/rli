import { Input } from "@/component";
import { connect } from "react-redux";
import Config from "@/common/core/config";
import React, { useEffect, useMemo } from "react";
import { Form, Select, FormInstance } from "antd";
import { namespace as assertNamespace } from "@/pages/Assert/actions";
import roleActions, { namespace as roleNamespace } from "@/pages/Setting/role/actions";

interface userFormProps {
    form?: FormInstance;
    rolelist?: ROLE.entity[];
    initialValues?: USER.entity;
    corporations?: ASSERT.corporation[];
}

const userForm: React.FC<userFormProps> = ({ form, rolelist, initialValues, corporations }) => {
    const roleOptions = useMemo<Global.optionTypes>(
        () =>
            rolelist
                ? [{ label: "所有角色", value: "" }, ...rolelist.map((r) => ({ label: r.roleDesc, value: r.roleName }))]
                : (roleActions.listRole(), []),
        [rolelist]
    );

    const corpOptions = useMemo<Global.optionTypes>(
        () => corporations?.map((cp) => ({ label: cp.corporationName, value: cp.id })),
        [corporations]
    );

    useEffect(() => {
        initialValues && form?.resetFields();
    }, [initialValues]);

    return (
        <Form {...Config.formLayout.default} form={form}>
            <Form.Item
                name={"username"}
                label={"用户名"}
                initialValue={initialValues?.userName}
                rules={[{ required: true, message: "请输入用户名" }]}
            >
                <Input placeholder={"请输入用户名"} disabled={Boolean(initialValues)} />
            </Form.Item>

            <Form.Item
                label={"真实姓名"}
                name={"displayName"}
                initialValue={initialValues?.userDisplayName}
                rules={[{ required: true, message: "请输入真实姓名" }]}
            >
                <Input placeholder={"请输入真实姓名"} />
            </Form.Item>

            <Form.Item name={"phone"} label={"手机号"} initialValue={initialValues?.userPhone}>
                <Input placeholder={"请输入手机号"} />
            </Form.Item>

            <Form.Item
                label={"邮箱"}
                name={"email"}
                initialValue={initialValues?.userEmail}
                rules={[{ type: "email", message: "请输入正确的邮箱地址" }]}
            >
                <Input placeholder={"请输入邮箱"} />
            </Form.Item>

            <Form.Item
                name={"role"}
                label={"角色"}
                initialValue={initialValues?.roleName}
                rules={[{ required: true, message: "请请选择角色" }]}
            >
                <Select allowClear={true} options={roleOptions} placeholder={"请选择角色"} />
            </Form.Item>

            <Form.Item name={"corporationId"} label={"所属单位"} initialValue={initialValues?.userCorporationIdFk}>
                <Select allowClear={true} options={corpOptions} placeholder={"请选择所属单位"} />
            </Form.Item>
        </Form>
    );
};

export const UserForm = connect(
    ({
        [roleNamespace]: { rolelist },
        [assertNamespace]: { corporations },
    }: {
        [roleNamespace]: ROLE.StateType;
        [assertNamespace]: ASSERT.StateType;
    }) => ({
        rolelist,
        corporations,
    })
)(userForm);
