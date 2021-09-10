import React from "react";
import { Modal as Md, ModalProps } from "antd";

interface modalProps extends ModalProps {}

export const Modal: React.FC<modalProps> = (props) => {
    return <Md {...props} />;
};
