/**
 * Author        jfh
 * Date          2021-09-06
 * email         feihongjiang@caih.com
 * Description   错误边界<无法恢复>
 */
import styles from "./style.less";
import React, { ErrorInfo } from "react";

interface errorProps {
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends React.Component<any, errorProps> {
    constructor(props: any) {
        super(props);
        this.state = { error: undefined, errorInfo: undefined };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error, errorInfo });
    }

    render() {
        const { error, errorInfo } = this.state;

        if (errorInfo) {
            return (
                <div className={styles.ErrBoundary}>
                    <label>{"出错啦"}</label>
                    <details className={styles.content}>
                        {error?.toString()}
                        <br />
                        {errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
