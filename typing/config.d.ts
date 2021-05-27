export declare namespace GlobalConfig {
    type NODE_ENV = "development" | "production";

    interface ConfigApi {
        /**
         * app名称
         * default=package.json[name]
         */
        appName?: string;

        author?: string;
        gitVer?: string;
        branch?: string;
        email?: string;

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

        reactVer?: string;
        webpackVer?: string;
        repository?: string;
        nodeVer?: string;
    }

    type dataType = ObjectCode | number | string | boolean | Array<dataType>;

    interface code {
        [key: string]: string | number;
    }

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

    interface assertType {
        name: string;
        size: number;
        percent: string;
    }

    interface asserGroup {
        [key: string]: assertType[];
    }

    interface resultProps extends ConfigApi {
        /**
         * 程序运行时间
         */
        runTime: number;

        time: string;

        /**
         * 编译时间
         */
        compileTime?: number;

        hash?: string;

        publicPath?: string;
        outputPath?: string;

        assets?: asserGroup;
        size: number;
    }
}
