import React from "react";
import styles from "./style.less";
import { Button } from "@/component";
import Container from "@/component/Container";

const home: React.FC = () => {
    const click = () => {
        console.log("this is home page");
    };

    return (
        <Container className={styles.Home}>
            <h1>{"this is Home"}</h1>

            <Button type={"primary"} onClick={click}>
                {"click me"}
            </Button>
        </Container>
    );
};

export default home;
