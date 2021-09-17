import React from "react";
import { Tree, TreeProps } from "antd";
import { Controlled } from "./controlled";

function tree(props: TreeProps) {
    return <Tree {...props} />;
}

tree.Controlled = Controlled;

export default tree;
