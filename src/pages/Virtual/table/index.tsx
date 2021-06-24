import React from "react";

import VirtualTable, { columnTypes } from "@/component/VirtualTable";

const user = ["admin", "tom", "daisy", "swallowj", "cat"];
const __num = 100;

interface dataSourceProps {
    id: number;
    status: number;
    user: string;
}

const dataSource = new Array(__num).fill(0).map<dataSourceProps>((_, i) => {
    return {
        id: i,
        status: Math.round(Math.random() * 4),
        user: user[Math.round(Math.random() * (user.length - 1))],
    };
});

const columns: columnTypes<dataSourceProps> = [
    {
        title: "ID",
        dataIndex: "id",
        width: 150,
        align: "center",
    },
    {
        title: "状态",
        dataIndex: "status",
        width: 150,
        align: "center",
    },
    {
        title: "用户",
        dataIndex: "user",
        width: 250,
        align: "center",
        render: (text, record) => {
            return <span style={{ color: "red" }}>{text}</span>;
        },
    },
];

const Table: React.FC = () => {
    const loadData = () => {
        console.log("========");
    };

    return (
        <VirtualTable
            columns={columns}
            rowHeight={45}
            total={1000}
            load={loadData}
            dataSource={dataSource}
            renderEmpty={<span>{"No Data"}</span>}
        />
    );
};

export default Table;
