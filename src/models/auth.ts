import { modelType, Gen } from "@/typings/model";
import LanguageManager from "@/common/core/language";
import { commonService } from "@/service/commonService";

export const namespace = "AUTH";

export interface AuthStateType {
    auth?: Global.AUTH.entity;
}

const AuthModel: modelType<AuthStateType> = {
    namespace,

    state: {},

    effects: {
        *getAuthInfo(_, { call }) {
            const response = yield call(commonService.getAuthInfo());
            console.log("get Auth info", response);
        },
    },

    reducers: {},
};

export default AuthModel;
