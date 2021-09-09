/**
 * Author        jfh
 * Date          2021-09-03
 * email         feihongjiang@caih.com
 * Description   布局组件
 */

import React from "react";
import { BaseLayout } from "./Layout";
import security from "@/common/core/securety";
import { RouteChildrenProps } from "react-router-dom";

interface layoutProps extends RouteChildrenProps {
    routers?: Aplication.routers;
}

const Layout: React.FC<layoutProps> = (props) => {
    return <BaseLayout {...props} />;
};

export default security.verify(Layout);
