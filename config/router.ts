import { RouterApi } from "../script/utils/tools";

export default RouterApi([
    {
        path: "/graphVisual",
        routers: [
            {
                path: "/graphVisual/x6",
                component: "@/pages/GraphicVisual/x6",
            },
        ],
    },
    {
        path: "/System",
        routers: [
            {
                path: "/System/role",
                component: "@/pages/System/role",
            },
            {
                path: "/System/user",
                component: "@/pages/System/user",
            },
        ],
    },
    {
        path: "/",
        redirect: "/System/user",
    },
]);
