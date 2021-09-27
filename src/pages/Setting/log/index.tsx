import moment from "moment";
import styles from "./style.less";
import { connect } from "react-redux";
import { TableColumnType } from "antd";
import { DetailLog } from "./component";
import { detailArr } from "./component/data";
import Container from "@/component/Container";
import actions, { namespace } from "./actions";
import fileService from "@/service/fileService";
import langservice from "@/common/core/language";
import { DownloadOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import { Table, Input, Button, DatePicker } from "@/component";

interface logProps extends LOG.StateType {}

const log: React.FC<logProps> = ({ page, logs }) => {
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

    const download = () => {
        fileService.worker();
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
                <Button icon={<DownloadOutlined />} className={styles.downloadBtn} onClick={download}>
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
