import React from "react";
import { BaseLayout } from "./Layout";

interface layoutProps {
    routers?: Aplication.routers;
}

const Layout: React.FC<layoutProps> = (props) => {
    return <BaseLayout {...props} />;
};

export default Layout;
