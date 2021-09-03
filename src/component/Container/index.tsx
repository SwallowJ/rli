import React from "react";

function Container(props: Global.component) {
    const { children, className, style } = props;
    return <div>{children}</div>;
}
