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
import paths from "../config/paths";
import Logger from "@swallowj/logjs";
import { loadEnvironment } from "../config/env";

const logger = Logger.New({ name: "start" });

// logger.Info(paths);

try {
    loadEnvironment();
} catch (err) {
    console.log(err);
}
