import roleService from "./service";
import { namespace } from "./actions";
import loading from "@/component/Loading";
import { modelType, resultType } from "@/typings/model";

const RoleModel: modelType<ROLE.StateType> = {
    namespace,

    state: {
        perms: [],
        rolelist: [],
    },

    effects: {
        *list({ params }, { call, change }) {
            loading.run();
            const rolelist: resultType<ROLE.entity[]> = yield call(roleService.list(params));
            rolelist && change({ rolelist });
            loading.stop();
        },

        *listPermision(_, { call, change }) {
            const perms: resultType<ROLE.permType[]> = yield call(roleService.listPermision());
            perms && change({ perms });
        },

        *createRole({ payload, callback }, { call }) {
            loading.run();
            const response = yield call(roleService.create(payload));

            if (response) {
                roleService.message.success(`用户【${payload.newRole.roleName}】创建成功`);
                callback?.();
            }
            loading.stop();
        },
    },

    reducers: {},
};

export default RoleModel;
