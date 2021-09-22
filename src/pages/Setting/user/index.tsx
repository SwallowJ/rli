import styles from "./style.less";
import { connect } from "react-redux";
import Container from "@/component/Container";
import { Select, TableColumnType } from "antd";
import { Button, Table, Input, Divider } from "@/component";
import actions, { namespace } from "@/pages/Setting/user/actions";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChangePassword } from "./component";
import roleActions, { namespace as roleNamespace } from "@/pages/Setting/role/actions";

interface userProps extends USER.StateType {
    rolelist?: ROLE.entity[];
}

const user: React.FC<userProps> = ({ rolelist, userlist, page }) => {
    const [roleName, setRoleName] = useState("");
    const [searchKey, setSearchKey] = useState("");

    const columns = useRef<TableColumnType<USER.entity>[]>([
        { title: "用户名", dataIndex: "username" },
        { title: "真实姓名", dataIndex: "displayName" },
        { title: "角色", dataIndex: "roleDesc" },
        { title: "手机号", dataIndex: "phone" },
        { title: "邮箱", dataIndex: "email" },
        {
            title: "操作",
            key: "operation",
            render: (_, { username }) => (
                <div className={styles.opration}>
                    <a onClick={changePwd.bind(null, username)}>{"修改密码"}</a>
                    <Divider height={13} />
                    <a>{"编辑资料"}</a>
                </div>
            ),
        },
    ]);

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
        setSearchKey(keys);
    };

    const changePwd = (changePwdId: string) => {
        actions.changeState({ changePwdId });
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

    return (
        <Container className={styles.User}>
            <Container.Head className={styles.head}>
                <div>
                    <Select
                        allowClear={true}
                        options={roleOptions}
                        className={styles.select}
                        placeholder={"请选择角色"}
                        onChange={changeRoleName}
                    />
                    <Input.Search className={styles.search} placeholder={"请输入手机号/用户名"} onSearch={changeKeys} />
                </div>
                <Button type={"primary"}>{"+添加用户"}</Button>
            </Container.Head>

            <Container.Content>
                <Table
                    page={page}
                    rowKey={"userId"}
                    onPageChange={list}
                    dataSource={userlist}
                    columns={columns.current}
                />
            </Container.Content>

            <ChangePassword />
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
