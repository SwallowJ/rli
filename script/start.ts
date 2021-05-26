/**
 * Author        feihongjiang
 * Date          2021-04-29
 * email         feihongjiang@caih.com
 * Description   开发环境启动项目
 */

const ENV = "development";

process.env.NODE_ENV = ENV;
process.env.BABEL_ENV = ENV;

process.on("unhandledRejection", (err) => {
    throw err;
});

import Logger from "@swallowj/logjs";
import WebpackDevServer from "webpack-dev-server";
import WebPackConfig from "./utils/webpack.config";
import { loadRouter, loadModel } from "./utils/config";
import { HostUtils, loadEnvironment, createCompiler, DevserverConfig } from "./utils";

Logger.setGlobalLevel(0);
const logger = Logger.New({ name: "start" });

async function start() {
    logger.Info("项目启动中...");

    const HOST = process.env.HOST || "0.0.0.0";
    const PORT = await HostUtils.choosePort();

    /**
     * webpack配置
     */
    const configuration = WebPackConfig.createConfig();
    logger.Info("webpack 配置加载完成");

    const compiler = createCompiler(configuration);

    const serverConfiguration = DevserverConfig.createConfig();

    /**
     * TODO
     */
    //@ts-ignore
    const server = new WebpackDevServer(compiler, serverConfiguration);

    server.listen(PORT, HOST, (err) => {
        if (err) {
            logger.Error(err);
            return;
        }

        Logger.clear();
        logger.Info("服务器启动中...");
    });

    process.on("SIGINT", () => {
        server.close();
        process.exit();
    });

    process.on("SIGINT", () => {
        server.close();
        process.exit();
    });
}

try {
    loadEnvironment();
    loadRouter();
    loadModel();
    start();
} catch (err) {
    logger.Error(err);
    process.exit(1);
}
