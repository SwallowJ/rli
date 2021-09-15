import React from "react";
import { Button, ButtonProps } from "antd";

const button: React.FC<ButtonProps> = (props) => {
    return <Button {...props} className={`xc-btn-${props.type || "default"} ${props.className || ""}`} />;
};

export default button;
