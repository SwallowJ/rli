declare namespace Aplication {
    interface router {
        /**
         * 路径
         */
        path: string;

        /**
         * 组件
         */
        component?: any;
        push?: boolean;

        /**
         * 重定向地址
         */
        redirect?: string;

        /**
         * 子路由
         */
        routers?: router[];

        /**
         * 名称
         */
        name?: string;

        /**
         * 图标
         */
        icon?: string;

        /**
         * 额外的数据
         */
        data?: Object;

        key?: string;

        exact?: boolean;
    }

    type routers = router[];

    type permissionType = boolean | string[] | undefined;
}
