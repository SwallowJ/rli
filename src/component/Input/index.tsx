import React from "react";
import { Input, InputProps } from "antd";
import { debounce } from "@/utils/functools";
import { SearchProps } from "antd/es/input/Search";

function input(props: InputProps) {
    return <Input {...props} />;
}

interface serchProps extends SearchProps {}

const Search: React.FC<serchProps> = (props) => {
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!props.allowClear || value) {
            props.onSearch && props.onSearch(e.target.value, e);
        }
    };

    return <Input.Search {...props} onChange={props.onChange ? props.onChange : debounce(changeValue, 500)} />;
};

input.Search = Search;

export default input;
