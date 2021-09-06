import React from "react";
import styles from "./style.less";
import Container from "@/component/Container";

const home: React.FC = () => {
    return (
        <Container className={styles.Home}>
            <h1>{"this is Home"}</h1>
            <h1>{"this is Home"}</h1>
            <h1>{"this is Home"}</h1>
            <h1>{"this is Home"}</h1>
            <h1>{"this is Home"}</h1>
        </Container>
    );
};

export default home;
