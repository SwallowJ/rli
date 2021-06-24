/**
 * Author        jiangfh
 * Date          2021-05-10
 * email         feihongjiang@caih.com
 * Description   webpack DevServer 配置
 */

import paths from "./paths";
import config from "./config";
import { Configuration } from "webpack-dev-server";

export class DevserverConfig {
    static createConfig() {
        return this.__config();
    }

    private static __config(): Configuration {
        return {
            disableHostCheck: config.disableHostCheck,

            /**
             * 压缩文件
             */
            compress: true,

            clientLogLevel: "info",

            contentBase: paths.appPublic,

            contentBasePublicPath: paths.publicPath,

            /**
             * 监听 contentBase 目录文件变更
             */
            watchContentBase: true,

            /**
             * 热更新
             */
            hot: true,

            /**
             * 通信服务器
             */
            transportMode: "ws",

            /**
             * 注入客户端
             */
            injectClient: true,

            sockHost: config.sockHost,
            sockPath: config.sockPath,
            sockPort: config.sockPort,

            publicPath: paths.publicPath,

            /**
             * 配置https
             * TODO
             */
            // https: getHttpsConfig(),

            host: config.host || "0.0.0.0",

            /**
             * 错误显示
             * TODO
             */
            overlay: false,

            /**
             * 所有404请求都会响应 index.html内容
             */
            historyApiFallback: {
                disableDotRule: true,
                index: paths.publicPath,
            },

            /**
             * TODO
             * 服务器地址
             */
            // public: ""

            /**
             * TODO
             * 代理
             */
            // proxy:

            /**
             * TODO
             * mock
             */
            before(app) {},

            /**
             * TODO??
             */
            //  after
        };
    }
}
