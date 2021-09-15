import React from "react";
import { Table, TableProps } from "antd";

function table<RecordType extends object = any>(props: TableProps<RecordType>) {
    return <Table {...props} />;
}

export default table;
