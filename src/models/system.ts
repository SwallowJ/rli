import { message } from "antd";
import timeUtils from "@/utils/time";
import { namespace } from "@/actions/system";
import { modelType, Gen } from "@/typings/model";
import fileService from "@/service/fileService";
import LanguageManager from "@/common/core/language";

const SystemModel: modelType<SYSTEM.StateType> = {
    namespace,

    state: {
        files: [],
    },

    effects: {
        *download({ payload, callbacks, key }, { change, select }) {
            const funcs: SYSTEM.fileCallback = callbacks;
            funcs?.before?.();
            const status: SYSTEM.fileStatus = { key, type: 1, createTime: timeUtils.now() };
            change({ files: [status, ...(select().files || [])] });

            console.log(status);
        },
    },

    reducers: {},
};

export default SystemModel;
