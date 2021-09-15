/**
 * Author        feihongjiang
 * Date          2021-09-15
 * email         feihongjiang@caih.com
 * Description   目录模板生成
 */
import Logger from "@swallowj/logjs";

const logger = Logger.New({ name: "start" });

try {
    console.log("===");
} catch (err) {
    logger.Error(err);
    process.exit(1);
}
