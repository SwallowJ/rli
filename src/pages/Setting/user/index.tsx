import styles from "./style.less";
import { connect } from "react-redux";
import Container from "@/component/Container";
import { Select, TableColumnType } from "antd";
import langservice from "@/common/core/language";
import assertActions from "@/pages/Assert/actions";
import { Table, Input, Divider } from "@/component";
import React, { useEffect, useMemo, useState } from "react";
import actions, { namespace } from "@/pages/Setting/user/actions";
import { ChangePassword, EditUser, CreateUser } from "./component";
import roleActions, { namespace as roleNamespace } from "@/pages/Setting/role/actions";

interface userProps extends USER.StateType {
    rolelist?: ROLE.entity[];
}

const user: React.FC<userProps> = ({ rolelist, userlist, page }) => {
    const [roleName, setRoleName] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [lang] = langservice.useLanguage("system");

    const columns = useMemo<TableColumnType<USER.entity>[]>(
        () => [
            { title: lang("user.name"), dataIndex: "username" },
            { title: lang("user.displayName"), dataIndex: "displayName" },
            { title: lang("user.role"), dataIndex: "roleDesc" },
            { title: lang("user.phone"), dataIndex: "phone" },
            { title: lang("user.email"), dataIndex: "email" },
            {
                title: lang("operation"),
                key: "operation",
                render: (_, { username, userId }) => (
                    <div className={styles.opration}>
                        <a onClick={changePwd.bind(null, username)}>{lang("user.changePwd")}</a>
                        <Divider height={13} />
                        <a onClick={editUser.bind(null, userId)}>{lang("user.edit")}</a>
                    </div>
                ),
            },
        ],
        [lang]
    );

    const roleOptions = useMemo<Global.optionType[]>(
        () =>
            rolelist
                ? [{ label: "所有角色", value: "" }, ...rolelist.map((r) => ({ label: r.roleDesc, value: r.roleName }))]
                : (roleActions.listRole(), []),
        [rolelist]
    );

    const changeRoleName = (value: string) => {
        setRoleName(value ?? "");
    };

    const changeKeys = (keys: string) => {
        setSearchKey(keys.trim());
    };

    /**
     * 修改用户密码
     */
    const changePwd = (changePwdId: string) => {
        actions.changeState({ changePwdId });
    };

    /**
     * 编辑用户
     */
    const editUser = (editId: number) => {
        actions.editUserInfo(editId);
    };

    /**
     * 获取用户列表
     */
    const list = (pageNum?: number, pageSize?: number) => {
        actions.list(roleName, searchKey, pageNum ?? page?.pageNum, pageSize ?? page?.pageSize);
    };

    useEffect(() => {
        list();
    }, [roleName, searchKey]);

    useEffect(() => {
        assertActions.listCorp();
    }, []);

    return (
        <Container className={styles.User}>
            <Container.Head className={styles.head}>
                <div>
                    <Select
                        allowClear={true}
                        options={roleOptions}
                        className={styles.select}
                        onChange={changeRoleName}
                        placeholder={lang("user.placeholder.selectRole")}
                    />
                    <Input.Search
                        onSearch={changeKeys}
                        className={styles.search}
                        placeholder={lang("user.placeholder.search")}
                    />
                </div>
                <CreateUser list={list} />
            </Container.Head>

            <Container.Content>
                <Table page={page} rowKey={"userId"} onPageChange={list} dataSource={userlist} columns={columns} />
            </Container.Content>

            <ChangePassword />
            <EditUser list={list} title={lang("user.edit.title")} />
        </Container>
    );
};

export default connect(
    ({
        [roleNamespace]: { rolelist },
        [namespace]: { userlist, page },
    }: {
        [roleNamespace]: ROLE.StateType;
        [namespace]: USER.StateType;
    }) => ({
        page,
        rolelist,
        userlist,
    })
)(user);
