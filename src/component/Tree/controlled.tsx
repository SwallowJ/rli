import React, { Key } from "react";
import { Tree, TreeProps } from "antd";

interface conterolledTreeProps extends TreeProps {
    value?: Key[];
    onChange?: (value: Key[]) => void;
}

/**
 * 受控组件
 */
export const Controlled: React.FC<conterolledTreeProps> = (props) => {
    const { value, onChange } = props;

    const onCurrencyChange = (checked: { checked: Key[]; halfChecked: Key[] } | Key[]) => {
        if (Array.isArray(checked)) {
            onChange?.(checked);
        }
    };

    return (
        <Tree
            {...props}
            checkedKeys={value}
            selectedKeys={value}
            onCheck={onCurrencyChange}
            onSelect={onCurrencyChange}
        />
    );
};
