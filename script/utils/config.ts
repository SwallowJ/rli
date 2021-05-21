/**
 * Author        jiangfh
 * Date          2021-05-20
 * email         feihongjiang@caih.com
 * Description   配置解析
 */

import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import address from "address";
import { loadFile } from "./tools";
import Logger from "@swallowj/logjs";
import { GlobalConfig } from "../../typing/config";

const logger = Logger.New({ name: "config" });

const __checkEnv = () => {
    const { NODE_ENV } = process.env;

    logger.Info("开始加载配置");

    if (!NODE_ENV) {
        throw new Error("缺少环境变量 NODE_ENV");
    }
};

const resolveConfig = (function () {
    try {
        __checkEnv();
        const init: GlobalConfig.ConfigApi = {
            typescript: true,
            disableHostCheck: false,
            sockHost: address.ip(),
            sockPath: "/sockjs-node",
            host: address.ip(),
            appName: require(path.resolve(process.cwd(), "package.json")).name,
        };

        const res = loadFile({ filename: "config", init });

        logger.lineOver();
        logger.Success("配置加载完成");
        return res;
    } catch (err) {
        logger.Error(err);
        process.exit(1);
    }
})();

/**
 * 零时文件目
 */
const tempPath = (function () {
    const tempPath = path.resolve(process.cwd(), "src", "@temp");
    if (fs.existsSync(tempPath)) {
        if (fs.statSync(tempPath).isFile()) {
            fs.unlinkSync(tempPath);
            fs.mkdirSync(tempPath);
        }
    } else {
        fs.mkdirSync(tempPath);
    }

    return tempPath;
})();

/**
 *路由加载
 */
export const loadRouter = () => {
    let writeStream: fs.WriteStream | null = null;
    try {
        __checkEnv();
        const { NODE_ENV } = process.env;
        const filename = "router";

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

        const routers = require(config).default as GlobalConfig.RouterApi[];

        writeStream = fs.createWriteStream(path.resolve(tempPath, "router.tsx"));

        writeStream.write(
            `/**\n * Author        feihongjiang\n * Date          ${dayjs().format(
                "YYYY-MM-DD HH:mm:ss.SSS"
            )}\n * email         feihongjiang@caih.com\n * Description   路由配置\n */\n\n`
        );

        writeStream.write(`import React from "react";\n`);
        writeStream.write(`import loadable from "@loadable/component";\n`);
        writeStream.write(`import Loading from "@/pages/Common/loading";\n\n`);
        writeStream.write(`const options = {\n\tfallback: <Loading />,\n};\n\n`);
        writeStream.write(`const routers: Aplication.router[] = [\n`);

        const parseData = (data: GlobalConfig.dataType, t: number) => {
            const t1 = new Array(t).fill("\t").join("");
            const t2 = new Array(t + 1).fill("\t").join("");
            console.log(data);
            switch (Object.prototype.toString.call(data)) {
                case "[object String]":
                    writeStream?.write(`"${data}",`);
                    return;
                case "[object Object]":
                    writeStream?.write(`{\n`);
                    Object.entries(data).forEach(([key, value]) => {
                        writeStream?.write(`${t2}${key}: `);
                        parseData(value, t + 2);
                    });
                    writeStream?.write(`\n${t1}},`);
                    return;
                case "[object Array]":
                    writeStream?.write(`[`);
                    (data as Array<GlobalConfig.dataType>).forEach((d) => {
                        parseData(d, t + 2);
                    });
                    writeStream?.write(`],`);
                    return;

                default:
                    writeStream?.write(`${data},`);
                    return;
            }
        };

        const parseRouter = (routers: GlobalConfig.RouterApi[], t = 1) => {
            const t1 = new Array(t).fill("\t").join("");
            const t2 = new Array(t + 1).fill("\t").join("");

            routers.forEach((router) => {
                writeStream?.write(`${t1}{\n`);

                Object.entries(router).forEach(([key, value]) => {
                    switch (key) {
                        case "routes":
                            writeStream?.write(`${t2}routes: [\n`);
                            parseRouter(value, t + 2);
                            writeStream?.write(`${t2}],\n`);
                            return;

                        case "component":
                            writeStream?.write(`${t2}${key}: loadable(() => import("${value}"), options),\n`);
                            return;
                        case "data":
                            writeStream?.write(`${t2}${key}: `);
                            parseData(value, t + 1);
                            writeStream?.write("\n");
                            return;

                        default:
                            writeStream?.write(`${t2}${key}: "${value}",\n`);
                            return;
                    }
                });

                writeStream?.write(`${t1}},\n`);
            });
        };

        parseRouter(routers);

        writeStream.write(`];\n\nexport default routers;\n`);
    } catch (err) {
        logger.Error(err);
        process.exit(1);
    } finally {
        writeStream?.close();
    }
};

export default resolveConfig;
