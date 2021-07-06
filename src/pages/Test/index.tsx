import React from "react";
import { Button } from "antd";
import styles from "./style.less";

const Title: React.FC = (props) => <div className={styles.title}>{props.children}</div>;

const model: React.FC = (props) => {
    return (
        <div className={styles.test}>
            <Title>{"CSS 测试"}</Title>
            <div className={styles.title}>{"Hello World"}</div>
        </div>
    );
};

export default model;
