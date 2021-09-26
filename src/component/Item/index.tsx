import React from "react";
import styles from "./style.less";

interface itemProps extends Global.component {
    label?: string;
    value?: React.ReactText;
    span?: number;

    /**
     * 标题宽度
     * defaut = 40
     */
    labelWidth?: number;

    /**
     * label对齐方式
     */
    aligh?: "left" | "center" | "right";
}

function Item(props: itemProps) {
    const { label = "-", value, span = 24, aligh = "right", labelWidth = 40, className = "", style, children } = props;

    return (
        <div
            className={`${styles.Item} .xc-font-text ${className}`}
            style={{ width: `${(span / 24) * 100}%`, ...style }}
        >
            <label style={{ width: `${labelWidth}px`, textAlign: aligh }}>{`${label}：`}</label>
            <span>{value ?? children ?? "-"}</span>
        </div>
    );
}

interface wrapProps extends Global.component {}

const Wrap: React.FC<wrapProps> = ({ children, className = "", style }) => (
    <div className={`${styles.Wrap} ${className}`} style={style}>
        {children}
    </div>
);

Item.Wrap = Wrap;

export default Item;
