import React, { MouseEvent } from "react";
import { Button, ButtonProps } from "antd";
import { debounce } from "@/utils/functools";

const button: React.FC<ButtonProps> = (props) => {
    const onClick = (e: MouseEvent<HTMLElement>) => {
        props.onClick && props.onClick(e);
    };

    return (
        <Button
            {...props}
            className={`xc-btn-${props.type || "default"} ${props.className || ""}`}
            onClick={debounce(onClick)}
        />
    );
};

export default button;
