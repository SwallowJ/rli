import styles from "./style.less";
import { TableColumnType } from "antd";
import Config from "@/common/core/config";
import Container from "@/component/Container";
import React, { useEffect, useMemo, useRef, useState, MouseEvent } from "react";
import { connect } from "react-redux";
import { CreateRole, EditRole } from "./component";
import { Button, Table, Input, Divider, Modal } from "@/component";
import actions, { namespace } from "@/pages/Setting/role/actions";

interface roleProps extends ROLE.StateType {}

const role: React.FC<roleProps> = ({ rolelist, perms = [] }) => {
    const [searchKey, setSearchKey] = useState("");

    const permTree = useMemo(() => actions.parsePermTree(perms), [perms]);
    const columns = useRef<TableColumnType<ROLE.entity>[]>([
        { title: "角色名", dataIndex: "roleDesc" },
        { title: "创建时间", dataIndex: "createdDate" },
        { title: "更新时间", dataIndex: "updatedDate" },
        {
            title: "操作",
            key: "operation",
            render: (_, record) => (
                <div className={styles.opration}>
                    <a onClick={edit.bind(null, record)}>{"编辑"}</a>
                    <Divider height={13} />
                    <a onClick={del.bind(null, record)}>{"删除"}</a>
                </div>
            ),
        },
    ]);

    const del = (record: ROLE.entity, e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        Modal.confirm({
            title: `确认要删除角色[${record.roleName}]`,
            onOk: () => {
                actions.deleteRole(record.roleName, list);
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
        setSearchKey(keys);
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
                <Input.Search className={styles.search} placeholder={"角色名称"} onSearch={changeKeys} />
                <CreateRole permTree={permTree} updata={list} />
            </Container.Head>

            <Container.Content>
                <Table.Virtual
                    rowKey={"roleId"}
                    pagination={false}
                    dataSource={rolelist}
                    columns={columns.current}
                    scroll={{ y: (Config.screenHeight || 0) - 358 }}
                />
            </Container.Content>

            <EditRole permTree={permTree} updata={list} />
        </Container>
    );
};

export default connect(({ [namespace]: { rolelist, perms } }: { [namespace]: ROLE.StateType }) => ({
    perms,
    rolelist,
}))(role);
