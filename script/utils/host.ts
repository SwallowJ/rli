import net from "net";
import config from "./config";
import Logger from "@swallowj/logjs";

const logger = Logger.New({ name: "utils" });

const DEFAULT_PORT = config?.port || Number(process.env.PORT) || 3000;

export class HostUtils {
    /**
     * 获取可用端口
     * @param port 默认端口号
     */
    static choosePort(port: number = DEFAULT_PORT) {
        const server = net.createServer().listen(port);
        return new Promise<number>((resolve) => {
            server.on("listening", () => {
                server.close();

                if (DEFAULT_PORT != port) {
                    logger.Warn(`端口 ${DEFAULT_PORT} 已被占用, 当前端口: ${port}`);
                }
                resolve(port);
            });

            server.on("error", () => {
                logger.Debug(`端口${port}已被占用, 正在寻找新的可用端口...`);
                resolve(HostUtils.choosePort(port + 1));
            });
        });
    }
}
