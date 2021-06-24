import { Cell } from ".";
import styles from "../style.less";
import { rowProps } from "../typing";
import React, { useCallback, MouseEvent } from "react";

const row: React.FC<rowProps<any>> = ({ columns, style, className = "", data, index, onClick }) => {
    const clickRow = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            onClick && onClick(data, index, e);
        },
        [onClick]
    );

    return (
        <div
            style={style}
            onClick={clickRow}
            className={`${styles.Row} ${index & 1 ? styles.singal : styles.double} ${className}`}
        >
            {columns.map((column) => (
                <Cell column={column} key={column.dataIndex}>
                    {column.render ? column.render(data[column.dataIndex], data) : data[column.dataIndex]}
                </Cell>
            ))}
        </div>
    );
};

export const Row = React.memo(row);
