/**
 * Author     jfh
 * Date       2021-09-22 15:30:41.439
 * email      feihongjiang@caih.com
 * Desc       model 模板
 */

import service from "./service";
import { namespace } from "./actions";
import loading from "@/component/Loading";
import { modelType } from "@/typings/model";

const AssertModel: modelType<ASSERT.StateType> = {
    namespace,

    state: {
        corporations: [],
    },

    effects: {
        *listCorp({ payload }, { call, change }) {
            loading.run();

            const corporations = yield call(service.listCorp(payload));
            corporations && change({ corporations });
            loading.stop();
        },
    },

    reducers: {},
};

export default AssertModel;
