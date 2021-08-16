import loginService from "./service";
import { namespace } from "./actions";
import { modelType, GenType } from "@/typings/model";

export interface StateType {}

const LoginModel: modelType<StateType> = {
    namespace,

    state: {},

    effects: {
        *login({ params }, { call, put }): GenType<string> {
            const response = yield call(loginService.login(params));

            console.log(response);
        },
    },

    reducers: {},
};

export default LoginModel;
