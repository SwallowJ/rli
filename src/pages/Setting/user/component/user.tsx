import { Input } from "@/component";
import { connect } from "react-redux";
import React, { useMemo } from "react";
import Config from "@/common/core/config";
import langservice from "@/common/core/language";
import { PasswordForm } from "@/component/Scenes";
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
    const [lang] = langservice.useLanguage("system");
    const roleOptions = useMemo<Global.optionTypes>(
        () =>
            rolelist ? rolelist.map((r) => ({ label: r.roleDesc, value: r.roleName })) : (roleActions.listRole(), []),
        [rolelist]
    );

    const corpOptions = useMemo<Global.optionTypes>(
        () => corporations?.map((cp) => ({ label: cp.corporationName, value: cp.id })),
        [corporations]
    );

    const isEdit = useMemo(() => (initialValues && form?.resetFields(), Boolean(initialValues)), [initialValues]);

    return (
        <Form {...Config.formLayout.default} form={form}>
            <Form.Item
                name={"username"}
                label={lang("user.name")}
                rules={[{ required: true }]}
                initialValue={initialValues?.userName}
            >
                <Input placeholder={lang("user.form.msg.name")} disabled={isEdit} />
            </Form.Item>

            <Form.Item
                name={"displayName"}
                rules={[{ required: true }]}
                label={lang("user.displayName")}
                initialValue={initialValues?.userDisplayName}
            >
                <Input placeholder={lang("user.form.msg.displayName")} />
            </Form.Item>

            {isEdit || <PasswordForm label={"password"} name={"password"} />}

            <Form.Item name={"phone"} label={lang("user.phone")} initialValue={initialValues?.userPhone}>
                <Input placeholder={lang("user.form.msg.phone")} />
            </Form.Item>

            <Form.Item
                name={"email"}
                label={lang("user.email")}
                initialValue={initialValues?.userEmail}
                rules={[{ type: "email", message: lang("user.form.msg.emailCorrect") }]}
            >
                <Input placeholder={lang("user.form.msg.email")} />
            </Form.Item>

            <Form.Item
                name={"role"}
                label={lang("user.role")}
                initialValue={initialValues?.roleName}
                rules={[{ required: true, message: lang("user.form.msg.role") }]}
            >
                <Select allowClear={true} options={roleOptions} placeholder={lang("user.form.msg.role")} />
            </Form.Item>

            <Form.Item
                name={"corporationId"}
                label={lang("user.corporation")}
                initialValue={initialValues?.userCorporationIdFk}
            >
                <Select allowClear={true} options={corpOptions} placeholder={"user.form.msg.corporation"} />
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
