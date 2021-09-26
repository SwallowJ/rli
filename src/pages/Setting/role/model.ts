import service from "./service";
import { namespace } from "./actions";
import loading from "@/component/Loading";
import { modelType, resultType } from "@/typings/model";

const RoleModel: modelType<ROLE.StateType> = {
    namespace,

    state: {
        perms: [],
        editRole: null,
    },

    effects: {
        *list({ params }, { call, change }) {
            loading.run();
            const rolelist: resultType<ROLE.entity[]> = yield call(service.list(params));
            rolelist && change({ rolelist });
            loading.stop();
        },

        *listPermision(_, { call, change }) {
            const perms: resultType<ROLE.permType[]> = yield call(service.listPermision());
            perms && change({ perms });
        },

        *createRole({ payload, callback }, { call, languageTemp }) {
            loading.run();
            const response = yield call(service.create(payload));

            if (response) {
                service.message.success(
                    languageTemp("system", { roleName: payload.newRole.roleName }, "role.create.success")
                );
                callback?.();
            }
            loading.stop();
        },

        *deleteRole({ payload, callback }, { call, languageTemp }) {
            loading.run();
            const response = yield call(service.deleteRole(payload));
            if (response) {
                service.message.success(languageTemp("system", payload, "role.delete.success"));
                callback?.();
            }
            loading.stop();
        },

        *updataPermissions({ payload, callback }, { call, languageTemp }) {
            loading.run();
            const response = yield call(service.updataPerm(payload));
            if (response) {
                console.log(response);
                service.message.success(languageTemp("system", payload, "role.edit.success"));
                callback?.();
            }
            loading.stop();
        },
    },

    reducers: {},
};

export default RoleModel;
