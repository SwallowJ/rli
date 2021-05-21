import path from "path";
import Logger from "@swallowj/logjs";
import { GlobalConfig } from "../../typing/config";

const logger = Logger.New({ name: "config" });

export const ConfigApi = (args: GlobalConfig.ConfigApi) => args;

export const RouterApi = (args: GlobalConfig.RouterApi[]) => args;

export const loadFile = <T = any>({ filename, init }: GlobalConfig.loadFileProps<T>) => {
    const { NODE_ENV } = process.env;
    return [filename, `${filename}.local`, `${filename}.${NODE_ENV}`, `${filename}.${NODE_ENV}.local`]
        .map((f) => path.resolve(process.cwd(), "./config", f))
        .reduce<T>((o, f) => {
            try {
                logger.CommonLine(`加载文件 ${f}.js|ts`);
                o = { ...o, ...require(f).default };
                logger.SuccessLine(`文件 ${f}.js|ts 加载完成`);
            } finally {
                logger.FailedLine(`文件 ${f}.js|ts 不存在`);
                return o;
            }
        }, init);
};
