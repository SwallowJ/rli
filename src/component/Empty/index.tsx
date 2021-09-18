import React from "react";
import styles from "./style.less";
import { Empty, EmptyProps } from "antd";

interface emptyProps extends EmptyProps {
    height?: number;
}

function empty(props: emptyProps) {
    const { style, height, className = "" } = props;

    return (
        <Empty
            {...props}
            className={`${styles.Empty} ${className}`}
            style={{ ...style, height: `${height ?? style?.height ?? 300}px` }}
        />
    );
}

export default empty;
