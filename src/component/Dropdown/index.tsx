import React from "react";

import { Dropdown, DropDownProps } from "antd";

const dropDown: React.FC<DropDownProps> = (props) => (
    <Dropdown {...props} overlayClassName={`xc-dropdown ${props.overlayClassName || ""}`} />
);

export default dropDown;
