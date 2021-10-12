import moment from "moment";
import styles from "./style.less";
import timeutils from "@/utils/time";
import { connect } from "react-redux";
import { TableColumnType } from "antd";
import { DetailLog } from "./component";
import sysActions from "@/actions/system";
import { detailArr } from "./component/data";
import Container from "@/component/Container";
import actions, { namespace } from "./actions";
import langservice from "@/common/core/language";
import { DownloadOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import { Table, Input, Button, DatePicker } from "@/component";

interface logProps extends LOG.StateType {}

const log: React.FC<logProps> = ({ page, logs }) => {
    const [loading, setloading] = useState(false);
    const [searchKey, setSearchKey] = useState("");
    const [lang] = langservice.useLanguage("system");
    const [timeRange, setTimeRange] = useState<TIME.range>([moment().subtract(1, "M"), moment()]);

    const columns = useMemo<TableColumnType<LOG.entity>[]>(
        () => [
            { title: lang("log.userName"), dataIndex: "userDisplayName" },
            { title: lang("log.type"), dataIndex: "type", render: (text: string) => lang("log.operation", text) },
            { title: lang("log.obj"), dataIndex: "objDisplayName" },
            {
                title: lang("log.origin"),
                dataIndex: "refOriginDetail",
                render: (detail: Global.obj<any> | null, record) =>
                    Object.keys(detail || {}).length && detailArr.includes(record.type) ? (
                        <a onClick={showDetail.bind(null, detail!, record)}>{lang("log.detail")}</a>
                    ) : (
                        record.refOriginValue
                    ),
            },
            {
                title: lang("log.target"),
                dataIndex: "refTargetDetail",
                render: (detail: Global.obj<any> | null, record) =>
                    Object.keys(detail || {}).length && detailArr.includes(record.type) ? (
                        <a onClick={showDetail.bind(null, detail!, record)}>{lang("log.detail")}</a>
                    ) : (
                        record.refOriginValue
                    ),
            },
            { title: lang("log.eventTime"), dataIndex: "eventTime" },
        ],
        [lang]
    );

    /**
     * 获取日志列表
     */
    const list = (pageNum?: number, pageSize?: number) => {
        actions.list(searchKey, timeRange, pageNum ?? page?.pageNum, pageSize ?? page?.pageSize);
    };

    const changeKeys = (keys: string) => {
        setSearchKey(keys.trim());
    };

    const changeTime = (date: TIME.range) => {
        setTimeRange(date);
    };

    const showDetail = (detail: Global.obj<any>, record: LOG.entity) => {
        actions.changeState({ detailInfo: { ...record, obj: detail } });
    };

    /**
     * 下载日志
     */
    const download = () => {
        const begin = timeRange?.[0] ? timeutils.format(timeRange[0], "YYYY-MM-DD 00:00:00") : null;
        const end = timeRange?.[1] ? timeutils.format(timeRange[1], "YYYY-MM-DD 23:59:59") : null;

        sysActions.downloadFile(
            "/api/xc/archive/log",
            "下载日志",
            { params: { begin, end, usernameOrDisplayName: searchKey } },
            { before: () => setloading(true), finally: () => setloading(false) }
        );
    };

    useEffect(() => {
        list();
    }, [searchKey, timeRange]);

    return (
        <Container className={styles.Log}>
            <Container.Head className={styles.head}>
                <DatePicker.Range defaultValue={timeRange} onChange={changeTime} />
                <Input.Search
                    onSearch={changeKeys}
                    className={styles.search}
                    placeholder={lang("log.placeholder.search")}
                />
                <Button icon={<DownloadOutlined />} className={styles.downloadBtn} onClick={download} loading={loading}>
                    {lang("log.download")}
                </Button>
            </Container.Head>
            <Container.Content>
                <Table page={page} rowKey={"eventTime"} onPageChange={list} dataSource={logs} columns={columns} />
            </Container.Content>

            <DetailLog />
        </Container>
    );
};

export default connect(({ [namespace]: { page, logs } }: { [namespace]: LOG.StateType }) => ({ page, logs }))(log);
