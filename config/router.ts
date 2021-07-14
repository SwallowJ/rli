import { RouterApi } from "../script/utils/tools";

export default RouterApi([
    {
        path: "/login",
        component: "@/pages/Login",
    },
    {
        path: "/XC",
        component: "@/layout",
        routers: [
            {
                path: "/home",
                component: "@/pages/Home",
                data: { permission: ["XC_PMS_TEST"] },
            },
        ],
    },
    {
        path: "/",
        redirect: "/XC/home",
    },
]);
