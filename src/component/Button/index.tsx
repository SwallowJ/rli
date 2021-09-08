import React from "react";
import { Button as Btn, ButtonProps } from "antd";

export const Button: React.FC<ButtonProps> = (props) => {
    return <Btn {...props} className={`caih-btn ${props.className || ""}`} />;
};
