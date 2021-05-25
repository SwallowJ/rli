/**
 * Author        feihongjiang
 * Date          2021-05-25 06:13:53.863
 * email         feihongjiang@caih.com
 * Description   路由配置
 */

import React from "react";
import loadable from "@loadable/component";
import Loading from "@/pages/Common/loading";

const options = {
	fallback: <Loading />,
};

const routers: Aplication.router[] = [
	{
		path: "/graphVisual",
		routers: [
			{
				path: "/graphVisual/x6",
				component: loadable(() => import("@/pages/GraphicVisual/x6"), options),
			},
		],
	},
	{
		path: "/System",
		routers: [
			{
				path: "/System/role",
				component: loadable(() => import("@/pages/System/role"), options),
			},
			{
				path: "/System/user",
				component: loadable(() => import("@/pages/System/user"), options),
			},
		],
	},
	{
		path: "/",
		redirect: "/System/user",
	},
];

export default routers;
