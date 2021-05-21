export declare namespace GlobalConfig {
    type NODE_ENV = "development" | "production";

    interface ConfigApi {
        /**
         * app名称
         * default=package.json[name]
         */
        appName?: string;

        /**
         * 启动端口号
         */
        port?: number;

        /**
         * 主机地址
         */
        host?: string;

        /**
         * 启用代码分割
         */
        codeSplit?: true;

        /**
         * web入口文件
         */
        input?: string;

        /**
         * 打包输出文件
         */
        output?: string;

        sourcemap?: string | false;

        favicon?: string;

        /**
         * 使用Typescript?
         * default=true
         */
        typescript?: boolean;

        /**
         * 跳过host检查
         * default=false
         */
        disableHostCheck?: boolean;

        /**
         * 开发服务器使用的套接字主机
         */
        sockHost?: string;
        sockPath?: string;
        sockPort?: number | string;
    }

    type dataType = ObjectCode | number | string | boolean | Array<dataType>;

    interface ObjectCode {
        [key: string]: dataType;
    }

    interface RouterApi {
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
        routers?: RouterApi[];

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
        data?: dataType;
    }

    interface loadFileProps<T = {}> {
        /**
         * 需要加载的文件名
         */
        filename: string;

        /**
         * 初始值
         */
        init: T;
    }
}
