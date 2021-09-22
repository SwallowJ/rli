import React from "react";
import styles from "./style.less";
import { Virtual } from "./virtual";
import { Pagination } from "@/component";
import { Table, TableProps } from "antd";
import { VirtualList } from "./virtualList";

interface tableProps<RecordType> extends TableProps<RecordType> {
    page?: Global.pageType;
    onPageChange?: (page: number, pageSize?: number) => void;
}

function table<RecordType extends object = any>(props: tableProps<RecordType>) {
    const { page, pagination = true, onPageChange } = props;

    return (
        <>
            <Table {...props} pagination={false} />
            {Boolean(page && pagination) && (
                <Pagination {...Pagination.config(page, onPageChange)} {...pagination} className={styles.pagination} />
            )}
        </>
    );
}

table.Virtual = Virtual;
table.VirtualList = VirtualList;

export default table;
