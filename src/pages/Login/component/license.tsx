import React from "react";
import { Alert } from "antd";
import styles from "./style.less";
import { connect } from "react-redux";
import langservice from "@/common/core/language";

interface licenseProps {
    machineInfo?: LOGIN.machinceType;
}

export const License: React.FC<licenseProps> = ({ machineInfo }) => {
    const [tas] = langservice.useLanguage("common");

    return (
        <div className={styles.License}>
            <label className={styles.title}>{tas("license.title")}</label>
            <Alert
                type={"warning"}
                showIcon={true}
                message={"提示：将机器码发给技术服务人员，并将其提供的license文件上传即可激活。"}
            />
            <div className={styles.machine}>
                <label>{"机器码："}</label>
                <a>{"复制"}</a>
            </div>
            <div className={styles.machineInfo}>{machineInfo?.machineInfo}</div>
        </div>
    );
};
