import React from "react";
import { BaseHead } from "@/layout/Header";

export const BaseLayout: React.FC = (props) => {
    return (
        <div>
            <BaseHead />
            {props.children}
        </div>
    );
};
