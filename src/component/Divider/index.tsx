import React from "react";
import styles from "./style.less";

interface dividerProps extends Global.component {
    height?: number;
    width?: number;
}

function Divider(props: dividerProps) {
    const { className = "", style, height, width } = props;
    return <div className={`${styles.divider} ${className}`} style={{ ...style, height, width }} />;
}

export default Divider;
