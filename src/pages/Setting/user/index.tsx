import styles from "./style.less";
import React, { useRef } from "react";
import { Button, Table } from "@/component";
import Container from "@/component/Container";
import { Select, Input, TableColumnType } from "antd";

const user: React.FC = () => {
    const columns = useRef<TableColumnType<USER.entity>[]>([
        { title: "用户名", dataIndex: "username" },
        { title: "真实姓名", dataIndex: "displayName" },
        { title: "角色", dataIndex: "roleDesc" },
        { title: "手机号", dataIndex: "phone" },
        { title: "邮箱", dataIndex: "email" },
        { title: "操作", key: "operation" },
    ]);

    return (
        <Container className={styles.User}>
            <Container.Head className={styles.head}>
                <div>
                    <Select className={styles.select} />
                    <Input.Search className={styles.search} />
                </div>
                <Button type={"primary"}>{"+添加用户"}</Button>
            </Container.Head>

            <Container.Content>
                <Table columns={columns.current} />
            </Container.Content>
        </Container>
    );
};

export default user;
