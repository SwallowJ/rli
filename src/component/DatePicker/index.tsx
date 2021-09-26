import React from "react";
import { Range } from "./range";
import { DatePicker, DatePickerProps } from "antd";

function datePicker(props: DatePickerProps) {
    return <DatePicker {...props} />;
}

datePicker.Range = Range;

export default datePicker;
