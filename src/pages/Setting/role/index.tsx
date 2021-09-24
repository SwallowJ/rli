import styles from "./style.less";
import { connect } from "react-redux";
import { TableColumnType } from "antd";
import Config from "@/common/core/config";
import Container from "@/component/Container";
import langservice from "@/common/core/language";
import { CreateRole, EditRole } from "./component";
import { Table, Input, Divider, Modal } from "@/component";
import actions, { namespace } from "@/pages/Setting/role/actions";
import React, { useEffect, useMemo, useState, MouseEvent } from "react";

interface roleProps extends ROLE.StateType {}

const role: React.FC<roleProps> = ({ rolelist, perms = [] }) => {
    const [searchKey, setSearchKey] = useState("");
    const [lang, langT] = langservice.useLanguage("system");

    const permTree = useMemo(() => actions.parsePermTree(perms), [perms]);
    const columns = useMemo<TableColumnType<ROLE.entity>[]>(
        () => [
            { title: lang("role.name"), dataIndex: "roleDesc" },
            { title: lang("role.createTime"), dataIndex: "createdDate" },
            { title: lang("role.updateTime"), dataIndex: "updatedDate" },
            {
                title: lang("operation"),
                key: "operation",
                render: (_, record) => (
                    <div className={styles.opration}>
                        <a onClick={edit.bind(null, record)}>{lang("role.edit")}</a>
                        <Divider height={13} />
                        <a onClick={del.bind(null, record.roleName)}>{lang("role.delete")}</a>
                    </div>
                ),
            },
        ],
        [lang]
    );

    const del = (roleName: string, e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        Modal.confirm({
            title: langT("role.delete.confirm", { roleName: roleName }),
            onOk: () => {
                actions.deleteRole(roleName, list);
            },
        });
    };

    const edit = (editRole: ROLE.entity, e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        actions.changeState({ editRole });
    };

    /**
     * 获取角色列表
     */
    const list = () => {
        actions.listRole(searchKey);
    };

    /**
     * 获取权限列表
     */
    const list_permision = () => {
        actions.listPermision();
    };

    const changeKeys = (keys: string) => {
        setSearchKey(keys.trim());
    };

    useEffect(() => {
        list_permision();
    }, []);

    useEffect(() => {
        list();
    }, [searchKey]);

    return (
        <Container className={styles.Role}>
            <Container.Head className={styles.head}>
                <Input.Search
                    onSearch={changeKeys}
                    className={styles.search}
                    placeholder={lang("role.placeholder.roleName")}
                />
                <CreateRole permTree={permTree} updata={list} />
            </Container.Head>

            <Container.Content>
                <Table.Virtual
                    rowKey={"roleId"}
                    columns={columns}
                    pagination={false}
                    dataSource={rolelist}
                    scroll={{ y: (Config.screenHeight || 0) - 358 }}
                />
            </Container.Content>

            <EditRole permTree={permTree} updata={list} title={lang("role.edit.title")} />
        </Container>
    );
};

export default connect(({ [namespace]: { rolelist, perms } }: { [namespace]: ROLE.StateType }) => ({
    perms,
    rolelist,
}))(role);
