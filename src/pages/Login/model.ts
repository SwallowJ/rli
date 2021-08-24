import loginService from "./service";
import { namespace } from "./actions";
import { modelType, Gen } from "@/typings/model";

export interface StateType {}

const LoginModel: modelType<StateType> = {
    namespace,

    state: {},

    effects: {
        *login({ params }, { call, put }): Gen<string> {
            const response = yield call(loginService.login(params));

            console.log(response);
        },
    },

    reducers: {},
};

export default LoginModel;
