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
}
