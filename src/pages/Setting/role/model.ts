import roleService from "./service";
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
                roleService.message.success(`角色【${payload.newRole.roleName}】创建成功`);
                callback?.();
            }
            loading.stop();
        },

        *deleteRole({ payload, callback }, { call }) {
            loading.run();
            const response = yield call(roleService.deleteRole(payload));
            if (response) {
                roleService.message.success(`角色【${payload.roleName}】已删除`);
                callback?.();
            }
            loading.stop();
        },

        *updataPermissions({ payload, callback }, { call }) {
            loading.run();
            const response = yield call(roleService.updataPerm(payload));
            if (response) {
                console.log(response);
                roleService.message.success(`角色【${payload.roleName}】已权限已更新`);
                callback?.();
            }
            loading.stop();
        },
    },

    reducers: {},
};

export default RoleModel;
