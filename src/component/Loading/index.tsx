import React from "react";
import ReactDOM from "react-dom";
import styles from "./style.less";
import { Spin } from "antd";

interface loadingParams {
    text?: string;
    delay?: number;
    timeout?: number;
}

class Loading {
    private globalID = "Global_loading_container";

    private runTimer: NodeJS.Timeout | null = null;
    private stopTimer: NodeJS.Timeout | null = null;
    private timeoutTimer: NodeJS.Timeout | null = null;

    constructor() {
        const root = document.createElement("div");
        root.setAttribute("id", this.globalID);
        root.setAttribute("class", styles.globalLoading);
        root.setAttribute("style", "display:none");

        ReactDOM.render(
            <>
                <Spin size={"large"} />
                <label className={styles.loadingText}>{"loading..."}</label>
            </>,
            root
        );

        document.body.appendChild(root);
    }

    /**
     * 全局加载状态
     */
    run(params: loadingParams = {}) {
        const { text = "加载中", delay = 200, timeout = 30000 } = params;

        this.runTimer && clearTimeout(this.runTimer);
        this.timeoutTimer && clearTimeout(this.timeoutTimer);

        this.runTimer = setTimeout(() => {
            const root = document.getElementById(this.globalID);
            if (!root) {
                return;
            }
            root.setAttribute("style", "display:flex");

            if (text) {
                root.getElementsByTagName("label")[0].innerText = text;
            }
            this.runTimer = null;
        }, delay);
        this.timeoutTimer = setTimeout(() => {
            this.stop();
        }, timeout);
    }

    /**
     * 停止加载状态
     */
    stop(delay = 100) {
        this.runTimer && clearTimeout(this.runTimer);
        this.stopTimer && clearTimeout(this.stopTimer);
        this.timeoutTimer && clearTimeout(this.timeoutTimer);

        this.stopTimer = setTimeout(() => {
            const root = document.getElementById(this.globalID);
            if (!root) {
                return;
            }
            root.setAttribute("style", "display:none");
            this.stopTimer = null;
        }, delay);
    }
}

export default new Loading();
