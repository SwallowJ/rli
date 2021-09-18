import React from "react";
import { Modal, ModalFuncProps, ModalProps } from "antd";

interface modalProps extends ModalProps {
    children?: React.ReactNode;
}

export function modal(props: modalProps) {
    return <Modal destroyOnClose={true} {...props} />;
}

const confirm = (props: ModalFuncProps) => {
    Modal.confirm({ okType: "danger", ...props });
};

modal.confirm = confirm;
export default modal;
