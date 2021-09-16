/**
 * Author        jiangfh
 * Date          2021-05-03
 * email         feihongjiang@caih.com
 * Description   加载环境变量
 */

import fs from "fs";
import path from "path";
import Logger from "@swallowj/logjs";

const logger = Logger.New({ name: "env" });

const NEWLINE = "\n";
const RE_NEWLINES = /\\n/g;
const NEWLINES_MATCH = /\n|\r|\r\n/;
const RE_INI_KEY_VAL = /^\s*([\w.-_@#&]+)\s*[=:]\s*(.*)?\s*$/;

const parse = (source: string) => {
    return source
        .split(NEWLINES_MATCH)
        .filter(Boolean)
        .reduce((o, line) => {
            const keyValueArr = line.match(RE_INI_KEY_VAL);

            if (keyValueArr) {
                let key = keyValueArr[1];
                let val = keyValueArr[2] || "";

                const end = val.length - 1;
                const isDoubleQuoted = val[0] === '"' && val[end] === '"';
                const isSingleQuoted = val[0] === "'" && val[end] === "'";

                if (isDoubleQuoted || isSingleQuoted) {
                    val = val.substring(1, end);
                    if (isDoubleQuoted) {
                        val = val.replace(RE_NEWLINES, NEWLINE);
                    }
                } else {
                    val = val.trim();
                }

                o[key] = val;
            }
            return o;
        }, Object({}));
};

/**
 * 加载环境变量
 */
const loadEnvironment = () => {
    logger.Info("开始加载环境变量");

    const { NODE_ENV } = process.env;

    if (!NODE_ENV) {
        logger.Faild("缺少环境变量 NODE_ENV");
        throw new Error("缺少环境变量 NODE_ENV");
    }

    /**
     *加载 .env, .local.env文件到环境变量
     */
    const envObj: Object = [".env", "local.env", `${NODE_ENV}.env`, `${NODE_ENV}.local.env`]
        .map((f) => path.resolve(process.cwd(), f))
        .reduce((obj, file) => {
            if (fs.existsSync(file)) {
                logger.Debug(`开始解析文件: ${file}`);
                const source = parse(fs.readFileSync(file, { encoding: "utf8" }));
                obj = { ...obj, ...source };
                logger.Debug(`解析完成: ${file} `);
            }
            return obj;
        }, Object({}));

    Object.entries(envObj).map(([key, value]) => {
        process.env[key] = value;
    });

    logger.Success("环境变量加载完成");
    return envObj;
};

export default loadEnvironment();
