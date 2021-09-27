import { RouterApi } from "../script/utils/tools";

export default RouterApi([
    {
        path: "/login",
        component: "@/pages/Login",
    },
    {
        path: "/XC",
        component: "@/layout",
        key: "menu",
        routers: [
            {
                path: "/home",
                name: "menu.home",
                component: "@/pages/Home",
                data: { permission: ["XC_APP_INDEX"] },
            },
            {
                path: "/workbench",
                name: "menu.workbench",
                component: "@/pages/Workbench",
                data: { permission: true },
            },
            {
                path: "/report",
                name: "menu.report",
                component: "@/pages/Report",
                data: { permission: ["XC_APP_REPORT"] },
            },
            {
                path: "/project",
                name: "menu.project",
                component: "@/pages/Project/panel",
                data: { permission: ["XC_APP_PROJECT"] },
            },
            {
                path: "/project/detail",
                name: "",
                component: "@/pages/Project/detail",
                data: { permission: ["XC_APP_PROJECT"] },
            },
            {
                path: "/assert",
                name: "menu.assert",
                data: { permission: [] },
                routers: [
                    {
                        path: "/device",
                        name: "menu.device",
                        component: "@/pages/Assert/device",
                        data: { permission: ["XC_APP_ASSET_DEVICE"] },
                    },
                    {
                        path: "/deliver",
                        name: "menu.deliver",
                        component: "@/pages/Assert/deliver",
                        data: { permission: ["XC_APP_ASSET_DELIVER"] },
                    },
                    {
                        path: "/signFor",
                        name: "menu.sign",
                        component: "@/pages/Assert/signFor",
                        data: { permission: ["XC_APP_ASSET_SIGNED"] },
                    },
                    {
                        path: "/contract",
                        name: "menu.contract",
                        component: "@/pages/Assert/contract",
                        data: { permission: ["XC_APP_FUND_CONTRACT"] },
                    },
                    {
                        path: "/ledger",
                        name: "menu.ledger",
                        component: "@/pages/Assert/ledger",
                        data: { permission: ["XC_APP_FUND_ACCOUNT"] },
                    },
                ],
            },
            {
                path: "/setting",
                name: "menu.setting",
                data: { permission: [] },
                routers: [
                    {
                        path: "/user",
                        name: "menu.user",
                        component: "@/pages/Setting/user",
                        data: { permission: ["XC_APP_USER"] },
                    },
                    {
                        path: "/role",
                        name: "menu.role",
                        component: "@/pages/Setting/role",
                        data: { permission: ["XC_APP_ROLE"] },
                    },
                    {
                        path: "/log",
                        name: "menu.log",
                        component: "@/pages/Setting/log",
                        data: { permission: ["XC_APP_LOG_MANAGE"] },
                    },
                    {
                        path: "/system",
                        name: "menu.system",
                        component: "@/pages/Setting/system",
                        data: { permission: ["XC_APP_SETTING"] },
                    },
                    {
                        path: "/operationReview",
                        name: "menu.opration",
                        component: "@/pages/Setting/operationReview",
                        data: { permission: ["XC_APP_APPLY"] },
                    },
                    {
                        path: "/fileUpload",
                        name: "menu.fileUpload",
                        key: "fileupload",
                        component: "@/common/view/404",
                        data: { permission: ["XC_APP_TRANSIT"] },
                    },
                ],
            },
        ],
    },
    {
        path: "/",
        exact: true,
        redirect: "/login",
    },
]);
