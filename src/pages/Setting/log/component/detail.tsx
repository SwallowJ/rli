import { connect } from "react-redux";
import { TableColumnType } from "antd";
import React, { useMemo } from "react";
import langservice from "@/common/core/language";
import { Modal, Item, Table } from "@/component";
import actions, { namespace } from "@/pages/Setting/log/actions";
import { commentArr,  projectArr, userArr, roleArr } from "./data";

interface detailProps extends LOG.StateType {}

interface dataParams {
    name: string;
    origin: string;
    target: string;
}

const __label_width = 85;

const detail: React.FC<detailProps> = ({ detailInfo }) => {
    const {
        type,
        userDisplayName,
        eventTime,
        objDisplayName,
        refOriginDetail,
        refTargetDetail,
        refTargetValue,
        refOriginValue,
        obj,
    } = detailInfo || {};
    const [lang] = langservice.useLanguage("system", "log.operation");

    const columns = useMemo<TableColumnType<dataParams>[]>(
        () => [
            { title: "", dataIndex: "name", width: 120 },
            { title: lang("before"), dataIndex: "origin", width: 260 },
            { title: lang("after"), dataIndex: "target", width: 260 },
        ],
        [lang]
    );

    const dataSource = useMemo<dataParams[]>(() => {
        const data: [string, string, string][] = [];
        if (type) {
            if (commentArr.includes(type)) {
                data.push([lang("comments"), refOriginDetail?.comment, refTargetDetail?.comment]);
            } else if (projectArr.includes(type)) {
                data.push(
                    [lang("project"), refOriginValue || refOriginDetail?.name, refTargetValue || refTargetDetail?.name],
                    [lang("corp"), userDisplayName ?? "", userDisplayName ?? "-"],
                    [lang("projectType"), refOriginDetail?.projectType, refTargetDetail?.projectType],
                    [lang("province"), refOriginDetail?.province, refTargetDetail?.province],
                    [lang("desc"), refOriginDetail?.description, refTargetDetail?.description]
                );
            } else if (userArr.includes(type)) {
                data.push(
                    [lang("username"), refOriginDetail?.userDisplayName, refTargetDetail?.userDisplayName],
                    [lang("phone"), refOriginDetail?.userPhone, refTargetDetail?.userPhone],
                    [lang("email"), refOriginDetail?.userEmail, refTargetDetail?.userEmail],
                    [lang("role"), refOriginDetail?.roleDisplayName, refTargetDetail?.roleDisplayName]
                );
            } else if (roleArr.includes(type)) {
                data.push(
                    [
                        lang("rolename"),
                        refOriginValue || refOriginDetail?.name || objDisplayName,
                        refTargetValue || refTargetDetail?.name || objDisplayName,
                    ],
                    [
                        lang("permission"),
                        refOriginDetail?.permissionDesc?.join("、"),
                        refTargetDetail?.permissionDesc?.join("、"),
                    ]
                );
            }
        }
        return data.map((d) => ({ name: d[0], origin: d[1], target: d[2] }));
    }, [type, lang]);

    const onCancel = () => {
        actions.changeState({ detailInfo: null });
    };

    return (
        <Modal width={700} title={lang("title")} visible={Boolean(detailInfo)} onCancel={onCancel} footer={false}>
            <Item.Wrap style={{ marginBottom: "10px" }}>
                <Item span={12} value={userDisplayName} labelWidth={__label_width} label={lang("user")} />
                <Item span={12} labelWidth={__label_width} value={obj?.todoUserDisplayName} label={lang("name")} />
                <Item span={12} labelWidth={__label_width} value={type ? lang(type) : ""} label={lang("type")} />
                <Item label={lang("time")} value={eventTime} labelWidth={__label_width} span={12} />
                <Item span={12} value={objDisplayName} labelWidth={__label_width} label={lang("target")} />
            </Item.Wrap>

            <Table pagination={false} dataSource={dataSource} columns={columns} bordered={true} rowKey={"name"} />
        </Modal>
    );
};

export const DetailLog = connect(({ [namespace]: { detailInfo } }: { [namespace]: LOG.StateType }) => ({ detailInfo }))(
    detail
);
