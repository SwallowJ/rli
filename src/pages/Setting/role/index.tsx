import styles from "./style.less";
import { TableColumnType } from "antd";
import Container from "@/component/Container";
import React, { useEffect, useRef } from "react";
import { Button, Table, Input } from "@/component";
import actions, { namespace } from "@/pages/Setting/role/actions";
import { connect, useDispatch } from "react-redux";
import { Virtual } from "@/component/Table/virtual";

interface roleProps extends ROLE.StateType {}

const role: React.FC<roleProps> = ({ rolelist }) => {
    const dispatch = useDispatch();

    const columns = useRef<TableColumnType<ROLE.entity>[]>([
        { title: "角色名", dataIndex: "roleDesc" },
        { title: "创建时间", dataIndex: "createdDate" },
        { title: "更新时间", dataIndex: "updatedDate" },
        { title: "操作", key: "operation" },
    ]);

    /**
     * 获取角色列表
     */
    const list = (searchKey?: string) => {
        dispatch(actions.listRole(searchKey));
    };

    useEffect(() => {
        list();
    }, []);

    return (
        <Container className={styles.Role}>
            <Container.Head className={styles.head}>
                <Input.Search className={styles.search} placeholder={"角色名称"} allowClear={true} onSearch={list} />
                <Button type={"primary"}>{"+添加角色"}</Button>
            </Container.Head>

            <Container.Content>
                <Virtual
                    columns={columns.current}
                    dataSource={rolelist}
                    rowKey={"roleId"}
                    pagination={false}
                    scroll={{ y: 400, x: "100vh" }}
                />
            </Container.Content>
        </Container>
    );
};

export default connect(({ [namespace]: { rolelist } }: { [namespace]: ROLE.StateType }) => ({ rolelist }))(role);
