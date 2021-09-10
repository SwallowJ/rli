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
                name: "首页",
                component: "@/pages/Home",
                data: { permission: ["XC_APP_INDEX"] },
            },
            {
                path: "/workbench",
                name: "工作台",
                component: "@/pages/Workbench",
                data: { permission: true },
            },
            {
                path: "/report",
                name: "报表",
                component: "@/pages/Report",
                data: { permission: ["XC_APP_REPORT"] },
            },
            {
                path: "/project",
                name: "项目管理",
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
                name: "资产管理",
                data: { permission: [] },
                routers: [
                    {
                        path: "/equipment",
                        name: "设备管理",
                        component: "@/pages/Assert/equipment",
                        data: { permission: ["XC_APP_ASSET_DEVICE"] },
                    },
                    {
                        path: "/deliver",
                        name: "发货管理",
                        component: "@/pages/Assert/deliver",
                        data: { permission: ["XC_APP_ASSET_DELIVER"] },
                    },
                    {
                        path: "/signFor",
                        name: "签收管理",
                        component: "@/pages/Assert/signFor",
                        data: { permission: ["XC_APP_ASSET_SIGNED"] },
                    },
                    {
                        path: "/contract",
                        name: "合同管理",
                        component: "@/pages/Assert/contract",
                        data: { permission: ["XC_APP_FUND_CONTRACT"] },
                    },
                    {
                        path: "/ledger",
                        name: "合同管理",
                        component: "@/pages/Assert/ledger",
                        data: { permission: ["XC_APP_FUND_ACCOUNT"] },
                    },
                ],
            },
            {
                path: "/setting",
                name: "设置",
                data: { permission: [] },
                routers: [
                    {
                        path: "/user",
                        name: "用户管理",
                        component: "@/pages/Setting/user",
                        data: { permission: ["XC_APP_USER"] },
                    },
                    {
                        path: "/role",
                        name: "角色管理",
                        component: "@/pages/Setting/role",
                        data: { permission: ["XC_APP_ROLE"] },
                    },
                    {
                        path: "/log",
                        name: "日志管理",
                        component: "@/pages/Setting/log",
                        data: { permission: ["XC_APP_LOG"] },
                    },
                    {
                        path: "/system",
                        name: "系统设置",
                        component: "@/pages/Setting/system",
                        data: { permission: ["XC_APP_SETTING"] },
                    },
                    {
                        path: "/operationReview",
                        name: "操作审核",
                        component: "@/pages/Setting/operationReview",
                        data: { permission: ["XC_APP_APPLY"] },
                    },
                ],
            },
        ],
    },
]);
