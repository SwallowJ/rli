import loginService from "./service";
import { namespace } from "./actions";
import { modelType, Gen } from "@/typings/model";

const LoginModel: modelType<LOGIN.StateType> = {
    namespace,

    state: {
        loading: false,
        license: null,
        machineInfo: null,
    },

    effects: {
        *login({ params }, { call, put }): Gen<string> {
            // const response = yield call(loginService.login(params));

            console.log(params);
        },

        /**
         * 获取license后存储到sessionStorage
         */
        *license(_, { call, change }) {
            yield change({ loading: true });

            const license: LOGIN.licenseType = yield call(loginService.getlicense());

            yield change({ license });
            if (!license) {
                const machineInfo: LOGIN.machinceType = yield call(loginService.getMachineInfo());
                yield change({ machineInfo });
            }

            yield change({ loading: false });
        },
    },

    reducers: {},
};

export default LoginModel;
