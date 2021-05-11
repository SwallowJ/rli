/**
 * Author        jiangfh
 * Date          2021-05-04
 * email         feihongjiang@caih.com
 * Description   配置解析
 */

import path from "path";
import address from "address";
import Logger from "@swallowj/logjs";
import { GlobalConfig } from "../../typing/config";

const logger = Logger.New({ name: "config" });

const resolveConfig = () => {
    const { NODE_ENV } = process.env;

    logger.Info("开始加载配置");

    if (!NODE_ENV) {
        logger.Faild("缺少环境变量 NODE_ENV");
        throw new Error("缺少环境变量 NODE_ENV");
    }

    const initObj: GlobalConfig.ConfigApi = {
        typescript: true,
        disableHostCheck: false,
        sockHost: "rli.test",
        sockPath: "/sockjs-node",
        host: address.ip(),
        appName: require(path.resolve(process.cwd(), "package.json")).name,
    };

    const res = ["config", "config.local", `config.${NODE_ENV}`, `config.${NODE_ENV}.local`]
        .map((f) => path.resolve(process.cwd(), "./config", f))
        .reduce<GlobalConfig.ConfigApi>((o, f) => {
            try {
                logger.CommonLine(`加载文件 ${f}.js|ts`);
                o = { ...o, ...require(f).default };
                logger.SuccessLine(`文件 ${f}.js|ts 加载完成`);
            } finally {
                logger.FailedLine(`文件 ${f}.js|ts 不存在`);
                return o;
            }
        }, initObj);

    logger.lineOver();
    logger.Success("配置加载完成");
    return res;
};

export default resolveConfig();
