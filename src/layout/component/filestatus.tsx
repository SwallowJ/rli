import React from "react";
import { Dropdown } from "antd";
import styles from "./style.less";
import { connect } from "react-redux";
import { namespace } from "@/actions/system";
import { FileSyncOutlined } from "@ant-design/icons";

interface fileProps extends SYSTEM.StateType {}

const fileStatus: React.FC<fileProps> = ({ files }) => {
    return files?.length ? (
        <Dropdown
            trigger={["click"]}
            className={styles.Files}
            overlay={
                <div className={`${styles.fileWrap} xc-file-wrap`}>
                    {files?.map((f) => (
                        <div className={`${styles.fileItem} xc-file-${f.type ? "download" : "upload"}`} key={f.key}>
                            <label>{f.filename ?? f.key}</label>
                            <span className={`${styles.time} xc-file-time`}>{f.createTime}</span>
                            <div className={`${styles.progress} wave`} />
                        </div>
                    ))}
                </div>
            }
        >
            <FileSyncOutlined />
        </Dropdown>
    ) : null;
};

export const FileStatus = connect(({ [namespace]: { files } }: { [namespace]: SYSTEM.StateType }) => ({ files }))(
    fileStatus
);
