import React from "react";
import styles from "./style.less";

interface baseProps extends Global.component {}

const base: React.FC<baseProps> = ({ className = "", style, children }) => {
    return (
        <div className={`${styles.BaseHead} ${className}`} style={style}>
            {children}
        </div>
    );
};

export const BaseHead = base;
