import React from "react";
import styles from "../style.less";
import { cellProps } from "../typing";

const __location = {
    left: "flex-star",
    right: "flex-end",
    center: "center",
};

const cell: React.FC<cellProps> = ({ className, children, style = {}, column }) => {
    return (
        <div
            className={`${styles.Cell} ${className || ""}`}
            style={{ width: `${column.width || 0}px`, justifyContent: __location[column.align || "left"], ...style }}
        >
            {children}
        </div>
    );
};

export const Cell = React.memo(cell);
