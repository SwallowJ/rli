/**
 * Author     jfh
 * Date       2021-09-24 10:37:41.159
 * email      feihongjiang@caih.com
 * Desc       model 模板
 */

import service from "./service";
import { namespace } from "./actions";
import loading from "@/component/Loading";
import { modelType } from "@/typings/model";

const LogModel: modelType<LOG.StateType> = {
    namespace,

    state: {
        logs: [],
        detailInfo: null,
        page: { pageNum: 1, pageSize: 10, total: 0 },
    },

    effects: {
        *list({ payload }, { call, change }) {
            loading.run();
            const response: Global.Result<LOG.entity[]> = yield call(service.list(payload));
            response && change({ logs: response.data, page: response.page });
            loading.stop();
        },
    },

    reducers: {},
};

export default LogModel;
