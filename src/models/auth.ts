import loading from "@/component/Loading";
import { modelType } from "@/typings/model";
import commonService from "@/service/commonService";

export const namespace = "AUTH";

export interface AuthStateType {
    auth?: Global.AUTH.entity;
}

const AuthModel: modelType<AuthStateType> = {
    namespace,

    state: {},

    effects: {
        *getAuthInfo({ callback }, { call, change }) {
            loading.run();
            const auth = yield call(commonService.getAuthInfo());
            if (auth) {
                callback && callback();
                change({ auth });
            }
            loading.stop();
        },
    },

    reducers: {},
};

export default AuthModel;
