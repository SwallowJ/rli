import React, { ChangeEvent, useRef } from "react";

interface fileSlectProps {
    onSelect?: (f?: FileList) => void;

    /**
     * 是否多选
     */
    multiple?: boolean;
}

export const FileSelect: React.FC<fileSlectProps> = ({ children, onSelect, multiple }) => {
    const fileRef = useRef<HTMLInputElement>(null);

    const onClick = () => {
        fileRef.current?.click();
    };

    const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
        onSelect && onSelect(e.target.files || undefined);
        if (fileRef.current && fileRef.current?.value) {
            fileRef.current.value = "";
        }
    };

    return (
        <>
            <input type={"file"} multiple={multiple} style={{ display: "none" }} ref={fileRef} onChange={changeFile} />
            {React.isValidElement(children) &&
                React.cloneElement(children, Object.assign({}, children.props, { onClick }))}
        </>
    );
};
