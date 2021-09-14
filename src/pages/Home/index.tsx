import React, { useEffect } from "react";
import styles from "./style.less";
// import less from "less";
import { Button } from "@/component/Button";
import Container from "@/component/Container";

const home: React.FC = (props) => {
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
