import React, { useRef } from "react";
import styles from "./style.less";
import { Button, Table } from "@/component";
import Container from "@/component/Container";
import { Input, TableColumnType } from "antd";

const home: React.FC = () => {
    const columns = useRef<TableColumnType<USER.entity>[]>([
        { title: "角色名", dataIndex: "roleDesc" },
        { title: "创建时间", dataIndex: "createdDate" },
        { title: "更新时间", dataIndex: "updatedDate" },
        { title: "操作", key: "operation" },
    ]);

    return (
        <Container className={styles.Role}>
            <Container.Head className={styles.head}>
                <Input.Search className={styles.search} />
                <Button type={"primary"}>{"+添加角色"}</Button>
            </Container.Head>

            <Container.Content>
                <Table columns={columns.current} />
            </Container.Content>
        </Container>
    );
};

export default home;
