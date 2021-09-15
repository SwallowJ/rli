/**
 * Author     jfh
 * Date       2021-09-15 14:24:48.978
 * email      feihongjiang@caih.com
 * Desc       model 模板
 */

import systemService from "./service";
import { namespace } from "./actions";
import loading from "@/component/Loading";
import { modelType } from "@/typings/model";

const SystemModel: modelType<SYSTEM.StateType> = {
    namespace,

    state: {},

    effects: {},

    reducers: {},
};

export default SystemModel;
