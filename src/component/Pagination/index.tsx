import React from "react";
import langservice from "@/common/core/language";
import { Pagination, PaginationProps } from "antd";

type changFunc = (page: number, pageSize?: number | undefined) => void;

function pagination(props: PaginationProps) {
    return <Pagination {...props} />;
}

pagination.config = (page?: Global.pageType, onChange?: changFunc): PaginationProps => {
    const [_, lang] = langservice.useLanguage("component");

    return {
        total: page?.total,
        onChange: onChange,
        showSizeChanger: true,
        current: page?.pageNum,
        onShowSizeChange: onChange,
        pageSizeOptions: ["10", "20", "50", "100"],
        showTotal: (total, range) => lang("pagination.showTotal", { start: range[0], end: range[1], total }),
    };
};

export default pagination;
