import React from "react";
import { BaseHead } from "@/layout/Header";

interface layoutProps {
    routers?: Aplication.routers;
}

export const BaseLayout: React.FC<layoutProps> = ({ routers = [], children }) => {
    console.log(routers);
    return (
        <div>
            <BaseHead />
            {children}
        </div>
    );
};
