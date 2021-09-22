/**
 * Author        feihongjiang
 * Date          2021-09-15
 * email         feihongjiang@caih.com
 * Description   目录模板生成
 */

import fs from "fs";
import path from "path";
import remark from "./remark";
import Logger from "@swallowj/logjs";

const logger = Logger.New({ name: "template" });

/**
 * action生成
 */
export const actions = (writeStream: fs.WriteStream, name: string) => {
    const actionName = `${name}Actions`;

    remark.mark(writeStream, { auth: "jfh", email: "feihongjiang@caih.com", desc: "actions 模板" });

    writeStream.write(`import { Actions } from "@/common/reducer/actions";\n\n`);
    writeStream.write(`export const namespace = "${name.toUpperCase()}";\n\n`);
    writeStream.write(`export class ${actionName} extends Actions {}\n\n`);
    writeStream.write(`export default new ${actionName}(namespace);\n`);
};

/**
 * model生成
 */
export const model = (writeStream: fs.WriteStream, name: string) => {
    const modelName = `${name}Model`;

    remark.mark(writeStream, { auth: "jfh", email: "feihongjiang@caih.com", desc: "model 模板" });

    writeStream.write(`import service from "./service";\n`);
    writeStream.write(`import { namespace } from "./actions";\n`);
    writeStream.write(`import loading from "@/component/Loading";\n`);
    writeStream.write(`import { modelType } from "@/typings/model";\n\n`);

    writeStream.write(`const ${modelName}: modelType<${name.toUpperCase()}.StateType> = {\n`);
    writeStream.write(`    namespace,\n\n`);
    writeStream.write(`    state: {},\n\n`);
    writeStream.write(`    effects: {},\n\n`);
    writeStream.write(`    reducers: {},\n};\n\n`);
    writeStream.write(`export default ${modelName};\n`);
};

/**
 * service生成
 */
export const service = (writeStream: fs.WriteStream, name: string) => {
    const serviceName = `${name}Service`;
    remark.mark(writeStream, { auth: "jfh", email: "feihongjiang@caih.com", desc: "service 模板" });

    writeStream.write(`import { ReqService } from "@/common/request/service";\n\n`);
    writeStream.write(`class ${serviceName} extends ReqService {}\n\n`);
    writeStream.write(`export default new ${serviceName}();\n`);
};

export const typing = (writeStream: fs.WriteStream, name: string) => {
    const namespace = name.toUpperCase();

    writeStream.write(`declare namespace ${namespace} {\n`);
    writeStream.write(`    interface StateType {}\n}\n`);
};
