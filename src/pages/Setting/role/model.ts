import roleService from "./service";
import { namespace } from "./actions";
import loading from "@/component/Loading";
import { modelType, resultType } from "@/typings/model";

const RoleModel: modelType<ROLE.StateType> = {
    namespace,

    state: {
        rolelist: [],
    },

    effects: {
        *list({ params }, { call, change }) {
            loading.run();
            const rolelist: resultType<ROLE.entity[]> = yield call(roleService.list(params));
            rolelist && change({ rolelist });
            loading.stop();
        },
    },

    reducers: {},
};

export default RoleModel;
