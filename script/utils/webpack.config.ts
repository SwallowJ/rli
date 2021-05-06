/**
 * Author        jiangfh
 * Date          2021-05-04
 * email         feihongjiang@caih.com
 * Description   webpack配置
 */

import config from "./config";
import { Configuration } from "webpack";
import { GlobalConfig } from "../../typing/config";

class WebPackConfig {
    private static isEnvPro: boolean;
    private static isEnvDev: boolean;
    private static NODE_ENV: GlobalConfig.NODE_ENV;

    /**
     * 获取webpack配置
     */
    static createConfig() {
        this.NODE_ENV = process.env.NODE_ENV;
        this.isEnvDev = this.NODE_ENV == "development";
        this.isEnvPro = this.NODE_ENV == "production";

        console.log(config);

        return this.config();
    }

    private static config(): Configuration {
        return {};
    }
}

export default WebPackConfig;
