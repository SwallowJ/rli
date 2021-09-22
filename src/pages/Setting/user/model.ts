/**
 * Author     jfh
 * Date       2021-09-18 15:31:25.188
 * email      feihongjiang@caih.com
 * Desc       model 模板
 */

import userService from "./service";
import { namespace } from "./actions";
import loading from "@/component/Loading";
import { modelType } from "@/typings/model";

const UserModel: modelType<USER.StateType> = {
    namespace,

    state: {
        page: { pageNum: 1, pageSize: 10, total: 0 },
    },

    effects: {
        *list({ payload }, { call, change }) {
            loading.run();
            const response: Global.Result<USER.entity[]> = yield call(userService.list(payload));
            response && change({ userlist: response.data, page: response.page });
            loading.stop();
        },
    },

    reducers: {},
};

export default UserModel;