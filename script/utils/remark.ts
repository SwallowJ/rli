/**
 * Author        feihongjiang
 * Date          2021-08-16
 * email         feihongjiang@caih.com
 * Description   生成文件备注
 */

import fs from "fs";
import dayjs from "dayjs";
import { GlobalConfig } from "typing/config";

class RemarkManagement {
    mark(writeStream: fs.WriteStream, options?: GlobalConfig.markOptions) {
        const { timeFormat, auth = "-", desc = "-", email = "-", date } = options || {};

        const time =
            date ||
            dayjs()
                .add(8, "h")
                .format(timeFormat || "YYYY-MM-DD HH:mm:ss.SSS");

        writeStream.write("/**\n");
        writeStream.write(` * Author     ${auth}\n`);
        writeStream.write(` * Date       ${time}\n`);
        writeStream.write(` * email      ${email}\n`);
        writeStream.write(` * Desc       ${desc}\n`);
        writeStream.write(" */\n\n");
    }
}

export default new RemarkManagement();
