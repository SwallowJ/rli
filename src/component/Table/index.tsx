import React from "react";
import { Virtual } from "./virtual";
import { Table, TableProps } from "antd";
import { VirtualList } from "./virtualList";

function table<RecordType extends object = any>(props: TableProps<RecordType>) {
    return <Table {...props} />;
}

table.Virtual = Virtual;
table.VirtualList = VirtualList;

export default table;
