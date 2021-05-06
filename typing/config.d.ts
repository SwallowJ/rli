export declare namespace GlobalConfig {
    type NODE_ENV = NodeJS.ProcessEnv["NODE_ENV"];

    interface ConfigApi {
        /**
         * 启动端口号
         */
        port?: number;

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
    }
}
