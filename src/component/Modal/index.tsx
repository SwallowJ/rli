import React from "react";
import { Modal, ModalProps } from "antd";

export const modal: React.FC<ModalProps> = (props) => {
    return <Modal destroyOnClose={true} {...props} />;
};

export default modal;
