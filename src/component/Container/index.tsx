import React from "react";
import styles from "./style.less";

function Container(props: Global.component) {
    const { children, className, style } = props;
    return (
        <div className={`${styles.Container} ${className}`} style={style}>
            {children}
        </div>
    );
}

export default Container;
