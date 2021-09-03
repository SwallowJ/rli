/**
 * Author        jfh
 * Date          2021-08-17
 * email         feihongjiang@caih.com
 * Description   代理配置
 */

import path from "path";
import Logger from "@swallowj/logjs";
import { GlobalConfig } from "../../typing/config";

const logger = Logger.New({ name: "proxy" });

export const createProxy = () => {
    try {
        const { PROXY = "", NODE_ENV } = process.env;

        const filename = "proxy";
        const config = [`${filename}.${NODE_ENV}.local`, `${filename}.${NODE_ENV}`, `${filename}.local`, filename]
            .map((f) => path.resolve(process.cwd(), "./config", f))
            .find((f) => {
                try {
                    return Boolean(require(f).default);
                } catch (err) {
                    return false;
                }
            });

        if (!config) {
            logger.Warn("未找到配置文件");
            return;
        }

        const proxyMap = require(config).default as GlobalConfig.proxyConfig;

        return proxyMap[PROXY];
    } catch (err) {
        logger.Error(err);
        return;
    }
};
