import React from "react";
import { Pagination, PaginationProps } from "antd";

type changFunc = (page: number, pageSize?: number | undefined) => void;

function pagination(props: PaginationProps) {
    return <Pagination {...props} />;
}

pagination.config = (page?: Global.pageType, onChange?: changFunc): PaginationProps => {
    return {
        total: page?.total,
        onChange: onChange,
        showSizeChanger: true,
        current: page?.pageNum,
        onShowSizeChange: onChange,
        pageSizeOptions: ["10", "20", "50", "100"],
        showTotal: (total, range) => `当前展示第${range[0]}-${range[1]}条，共${total}条记录`,
    };
};

export default pagination;
