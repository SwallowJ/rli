/**
 * Author        jiangfh
 * Date          2021-05-20
 * email         feihongjiang@caih.com
 * Description   配置解析
 */

import os from "os";
import fs from "fs";
import path from "path";
import env from "./env";
import crypto from "crypto";
import address from "address";
import remark from "./remark";
import { loadFile } from "./tools";
import Logger from "@swallowj/logjs";
import { execSync } from "child_process";
import { GlobalConfig } from "../../typing/config";

const logger = Logger.New({ name: "config" });

const __Reg_Model = /(namespace)(\S|\s)*(state:)(\S|\s)*(effects:)(\S|\s)*(reducers:)(\S|\s)*(export default).*/;

const __Src_Path = path.resolve(process.cwd(), "src");
const __Temp_Path = path.resolve(process.cwd(), "src/@temp");

interface code {
    [key: string]: string | number | undefined;
}

export const __checkEnv = () => {
    const { NODE_ENV, PORT } = process.env;

    if (!NODE_ENV) {
        throw new Error("缺少环境变量 NODE_ENV");
    }

    return process.env;
};

export const createWriteStream = (dir: string, filename: string) => {
    fs.existsSync(dir) || fs.mkdirSync(dir);
    const filepath = path.resolve(dir, filename);

    fs.existsSync(filepath) && fs.unlinkSync(filepath);
    return fs.createWriteStream(filepath);
};

const injectConfig = (c: GlobalConfig.ConfigApi) => {
    let writeStream: fs.WriteStream | null = null;

    try {
        writeStream = createWriteStream(__Temp_Path, "config.ts");
        remark.mark(writeStream, { auth: "feihongjiang", email: "feihongjiang@caih.com", desc: "参数配置" });

        const obj: code = {};

        obj.gitVer = c.gitVer;
        obj.branch = c.branch;
        obj.react = c.reactVer;
        obj.webpack = c.webpackVer;
        obj.prefix = c.prefix;
        obj.screenHeight = 700;

        writeStream.write("const config: Global.config = {\n");
        Object.entries(obj).map(([k, v]) => {
            let value = v;
            if (typeof v === "string") {
                value = `"${v}"`;
            }
            writeStream!.write(`\t${k}: ${value},\n`);
        });

        writeStream.write(`};\n\nexport default config;\n`);
    } catch (err) {
        logger.Error(err);
        process.exit(1);
    } finally {
        writeStream?.close();
    }
};

const __gitInfo = () => {
    try {
        const gitVer = execSync("git rev-parse --short=8 HEAD").toString("utf8").trim();
        const author = execSync("git show -s --format=%cn").toString("utf8").trim();
        const branch = execSync("git rev-parse --abbrev-ref HEAD").toString("utf8").trim();
        const email = execSync("git show -s --format=%ce").toString().trim();
        return { gitVer, author, branch, email };
    } catch (err) {
        return { gitVer: "-", author: "", branch: "", email: "" };
    }
};

const resolveConfig = (function () {
    try {
        const { NODE_ENV } = __checkEnv();

        logger.Info("开始加载配置");

        const packageJson = require(path.resolve(process.cwd(), "package.json"));

        const init: GlobalConfig.ConfigApi = {
            typescript: true,
            disableHostCheck: false,
            sockHost: address.ip(),
            sockPath: "/sockjs-node",
            host: address.ip(),
            appName: packageJson.name,
            ...__gitInfo(),
            reactVer: (packageJson.dependencies?.react || "-").replace("^", ""),
            webpackVer: (packageJson.dependencies?.webpack || "-").replace("^", ""),
            repository: packageJson.repository?.url || "",
            nodeVer: execSync("node -v").toString().trim(),
            hostname: os.hostname(),
            platform: os.platform(),
            port: Number(env["PORT"]),
            prefix: env["PREFIX"],
        };

        const res = loadFile({ filename: "config", init });

        if (NODE_ENV === "development") {
            res.appName = `${res.appName}(开发环境)`;
        }
        injectConfig(res);
        logger.lineOver();
        logger.Success("配置加载完成");
        return res;
    } catch (err) {
        logger.Error(err);
        process.exit(1);
    }
})();

const __scanModels = (dir: string, writeStream: fs.WriteStream, isModel: boolean) => {
    fs.readdirSync(dir).forEach((f) => {
        const p = path.resolve(dir, f);

        if (fs.statSync(p).isFile()) {
            if (!/\.[t|j]sx?$/.test(path.extname(f))) {
                return;
            }
            logger.CommonLine(`扫描目录 ${path.relative(__Src_Path, p)}`);

            const name = f.substring(0, f.lastIndexOf("."));

            if (isModel && name != "model") {
                logger.lineOver();
                return;
            }

            const content = fs.readFileSync(p, { encoding: "utf8" });

            if (__Reg_Model.test(content)) {
                const hash8 = crypto.createHash("sha256").update(content).copy().digest("hex").slice(0, 8);
                writeStream.write(`export * as ${name}_${hash8} from "${path.resolve(dir, name)}";\n`);
                logger.SuccessLine(`文件 ${path.relative(__Src_Path, p)} 加载完成`);
            }
        } else {
            __scanModels(p, writeStream, isModel);
        }
    });
};

/**
 * 加载model
 * 集成redux
 */
export const loadModel = () => {
    let writeStream: fs.WriteStream | null = null;
    try {
        writeStream = createWriteStream(__Temp_Path, "models.ts");
        remark.mark(writeStream, { auth: "feihongjiang", email: "feihongjiang@caih.com", desc: "redux加载模块" });
        const __Model_Path = path.resolve(__Src_Path, "models");
        const __Page_Path = path.resolve(__Src_Path, "pages");

        fs.existsSync(__Model_Path) &&
            fs.statSync(__Model_Path).isDirectory() &&
            __scanModels(__Model_Path, writeStream, false);

        fs.existsSync(__Page_Path) &&
            fs.statSync(__Page_Path).isDirectory() &&
            __scanModels(__Page_Path, writeStream, true);
    } catch (err) {
        logger.Error(err);
        process.exit(1);
    } finally {
        writeStream?.close();
    }
};

export default resolveConfig;
