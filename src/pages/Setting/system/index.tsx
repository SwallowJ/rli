import React from "react";
import styles from "./style.less";
import Container from "@/component/Container";

const home: React.FC = () => {
    return (
        <Container className={styles.System}>
            <h1>{"系统设置"}</h1>
        </Container>
    );
};

export default home;
