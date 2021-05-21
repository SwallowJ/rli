import { RouterApi } from "../script/utils/tools";

export default RouterApi([
    {
        path: "/graphVisual",
        routes: [
            {
                path: "/graphVisual/x6",
                component: "@/pages/GraphicVisual/x6",
            },
        ],
    },
    {
        path: "/System",
        routes: [
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
]);
