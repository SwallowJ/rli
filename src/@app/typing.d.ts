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
        routes?: RouterApi[];

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
    }
}
