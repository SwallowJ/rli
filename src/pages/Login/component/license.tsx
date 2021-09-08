import styles from "./style.less";
import React, { useRef } from "react";
import { Alert, message } from "antd";
import { Button } from "@/component/Button";
import fileService from "@/service/fileService";
import langservice from "@/common/core/language";
import { FileSelect } from "@/component/FileSelect";
import { CloudUploadOutlined } from "@ant-design/icons";

interface licenseProps {
    machineInfo?: LOGIN.machinceType;
}

export const License: React.FC<licenseProps> = ({ machineInfo }) => {
    const [tas] = langservice.useLanguage("login");
    const ref = useRef<HTMLDivElement>(null);

    const copy = () => {
        machineInfo &&
            navigator.clipboard
                .writeText(machineInfo.machineInfo)
                .then(() => {
                    message.success("复制成功");
                    const range = document.createRange();
                    window.getSelection()?.removeAllRanges();
                    range.selectNode(ref.current!);
                    window.getSelection()?.addRange(range);
                    ref.current?.scroll({ top: ref.current.scrollHeight });
                })
                .catch(() => {
                    message.error("机器码复制失败");
                });
    };

    const selectFile = (files?: FileList) => {
        if (files) {
            const file = files[0];
            const data = new FormData();
            data.append("licenseFile", file);
            fileService.upload("/xc/license?overwrite=true", { data });
        }
    };

    return (
        <div className={styles.License}>
            <label className={styles.title}>{tas("license.title")}</label>
            <Alert type={"warning"} showIcon={true} message={tas("license.alert")} />
            <div className={styles.machine}>
                <label>{tas("license.machine")}</label>
                {machineInfo && <a onClick={copy}>{tas("license.copy")}</a>}
            </div>
            <div className={styles.machineInfo} ref={ref}>
                {machineInfo?.machineInfo}
            </div>

            <div className={styles.licenseUpload}>
                <label>{tas("license.upload.title")}</label>
                <FileSelect onSelect={selectFile}>
                    <Button type={"primary"} icon={<CloudUploadOutlined />}>
                        {tas("license.upload.btn")}
                    </Button>
                </FileSelect>
            </div>
        </div>
    );
};
