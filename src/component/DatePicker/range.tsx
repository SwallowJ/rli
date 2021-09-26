import moment from "moment";
import timeutils from "@/utils/time";
import { Form, DatePicker } from "antd";
import React, { useEffect, useState } from "react";

interface rangeProps {
    allowClear?: boolean;
    defaultValue?: TIME.range;
    onChange?: (timeRange: TIME.range) => void;
    disabledDate?: null | ((current: moment.Moment) => boolean);
}

const __TIME_RANGE = "datePicker_timeRange_form";

export const Range: React.FC<rangeProps> = ({ defaultValue, onChange, allowClear, disabledDate }) => {
    const [form] = Form.useForm();
    const [beforeRange, setBeforeRange] = useState<TIME.range>([null, null]);

    const onOpenChange = (open: boolean) => {
        open ||
            form
                .validateFields([__TIME_RANGE])
                .then((value) => value[__TIME_RANGE])
                .then((timeRange: TIME.range) => {
                    const equal = timeutils.equalRange(timeRange, beforeRange);
                    if (!equal) {
                        onChange?.(timeRange);
                        setBeforeRange(timeRange);
                    }
                });
    };

    /**
     * 点击清除按钮触发
     */
    const changeTime = (date: TIME.range) => {
        if (date === null) {
            onChange?.(null);
            setBeforeRange(null);
        }
    };

    /**
     * 禁选日期
     */
    const defaultdisabledDate = (current: moment.Moment) => {
        return current && current > moment().endOf("day");
    };

    useEffect(() => {
        const _r = defaultValue || [moment().subtract(1, "M"), moment()];
        setBeforeRange(_r);
        form.setFieldsValue({ [__TIME_RANGE]: _r });
    }, [defaultValue]);

    return (
        <Form form={form}>
            <Form.Item noStyle={true} name={__TIME_RANGE}>
                <DatePicker.RangePicker
                    onChange={changeTime}
                    allowClear={allowClear}
                    onOpenChange={onOpenChange}
                    disabledDate={disabledDate === null ? undefined : disabledDate || defaultdisabledDate}
                />
            </Form.Item>
        </Form>
    );
};
