import React from "react";
import styles from "./style.less";
import { BaseHead } from "@/layout/Header";
import ErrorBoundary from "@/common/view/errBoundary";

interface layoutProps {
    routers?: Aplication.routers;
}

export const BaseLayout: React.FC<layoutProps> = ({ routers = [], children }) => {
    return (
        <div className={styles.BaseLayout}>
            <BaseHead routers={routers} />
            <ErrorBoundary>
                <div className={styles.content}>{children}</div>
            </ErrorBoundary>
        </div>
    );
};
