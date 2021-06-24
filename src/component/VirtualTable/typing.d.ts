import { ListChildComponentProps } from "react-window";
import React, { ReactNode, ReactText, MouseEvent } from "react";

interface code {
    [key: string]: any;
}

export interface columnType<T = code> {
    /**
     * 表头
     */
    title: ReactNode;

    /**
     * 数据索引
     */
    dataIndex: ReactText;

    /**
     * 列宽度
     */
    width?: number;

    /**
     * 对齐方式 default="left"
     */
    align?: "left" | "center" | "right";

    render?: (data: any, record: T) => ReactNode;
}

export type columnTypes<T = code> = columnType<T>[];

export interface cellProps {
    /**
     * 单元格样式
     */
    style?: React.CSSProperties;
    /**
     * 单元格样式
     */
    className?: string;

    /**
     * 单元格内容
     */
    children?: ReactNode;

    /**
     * 列样式
     */
    column: columnType;
}

export type rowClickFunc<T extends code> = (data: T, index: number, e: MouseEvent<HTMLDivElement>) => void;

export interface rowProps<T extends code> extends ListChildComponentProps {
    /**
     * 表格行类名
     */
    className?: string;

    /**
     * 列样式
     */
    columns: columnTypes<T>;

    /**
     * 待渲染数据
     */
    data: T;

    /**
     * 点击事件
     */
    onClick?: rowClickFunc;
}

export type loadFunc = () => void;

export interface tableProps<T extends code> {
    /**
     * 表格列属性 default=[]
     */
    columns?: columnTypes<T>;

    /**
     * 表格高度 default=400
     */
    height?: number;

    /**
     * 表格宽度 defaut=100%
     */
    width?: number;

    /**
     * 表格样式类名
     */
    className?: string;

    /**
     * 表格样式
     */
    style?: React.CSSProperties;

    /**
     * 行高 default=35
     */
    rowHeight?: number;

    /**
     * 表格头高度 default=rowHeight
     */
    headHeight?: number;

    /**
     * 表格头样式
     */
    headClass?: string;

    /**
     * 数据源 default=[]
     */
    dataSource?: T[];

    /**
     * 行样式类名
     */
    rowClass?: string;

    /**
     * 行渲染样式
     * 默认按columns样式渲染
     */
    rowRender?: React.FC<rowProps<T>>;

    /**
     * 点击行事件
     */
    onRowClick?: rowClickFunc;

    /**
     * 数据总条数 deault=-Infinity
     */
    total?: number;

    load?: loadFunc;

    renderEmpty?: ReactNode;
}

export default columnType;
