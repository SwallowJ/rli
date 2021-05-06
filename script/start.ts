/**
 * Author        jiangfh
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

import fs from "fs";
import webpack from "webpack";
import paths from "./utils/paths";
import Logger from "@swallowj/logjs";
import { HostUtils, loadEnvironment } from "./utils";
import WebPackConfig from "./utils/webpack.config";

Logger.setGlobalLevel(0);
const logger = Logger.New({ name: "start" });

try {
    loadEnvironment();
    start();
} catch (err) {
    console.log(err);
}

async function start() {
    const HOST = process.env.HOST || "0.0.0.0";

    const PORT = await HostUtils.choosePort();

    /**
     * webpack配置
     */
    const configuration = WebPackConfig.createConfig();
    console.log(configuration);
}
