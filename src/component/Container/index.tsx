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

const Head: React.FC<Global.component> = ({ children, className, style }) => {
    return (
        <div className={`${styles.Head} ${className}`} style={style}>
            {children}
        </div>
    );
};

const Content: React.FC<Global.component> = ({ children, className, style }) => {
    return (
        <div className={`${styles.Content} ${className}`} style={style}>
            {children}
        </div>
    );
};

Container.Head = Head;
Container.Content = Content;

export default Container;
