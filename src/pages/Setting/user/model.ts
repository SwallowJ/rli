/**
 * Author     jfh
 * Date       2021-09-18 15:31:25.188
 * email      feihongjiang@caih.com
 * Desc       model 模板
 */

import service from "./service";
import { namespace } from "./actions";
import loading from "@/component/Loading";
import { modelType } from "@/typings/model";

const UserModel: modelType<USER.StateType> = {
    namespace,

    state: {
        changePwdId: "",
        page: { pageNum: 1, pageSize: 10, total: 0 },
    },

    effects: {
        *list({ payload }, { call, change }) {
            loading.run();
            const response: Global.Result<USER.entity[]> = yield call(service.list(payload));
            response && change({ userlist: response.data, page: response.page });
            loading.stop();
        },

        *changePassword({ payload, callback }, { call, languageTemp }) {
            loading.run();
            const response = yield call(service.changePassword(payload));
            if (response) {
                callback?.();
                service.message.success(languageTemp("system", payload, "user.changePassword.success"));
            }
            loading.stop();
        },

        *editUserInfo({ payload }, { call, change }) {
            loading.run({ timeout: 5000 });
            const editInfo: USER.entity = yield call(service.getUserInfo(payload));
            editInfo && change({ editInfo });
            loading.stop();
        },

        *updata({ payload, callback }, { call, languageTemp }) {
            loading.run();
            const response = yield call(service.updata(payload));
            if (response) {
                callback?.();
                service.message.success(languageTemp("system", payload, "user.edit.success"));
            }
            loading.stop();
        },

        *create({ payload, callback }, { call, languageTemp }) {
            loading.run();
            const response = yield call(service.create(payload));
            if (response) {
                callback?.();
                service.message.success(languageTemp("system", payload, "user.create.success"));
            }
            loading.stop();
        },
    },

    reducers: {},
};

export default UserModel;
