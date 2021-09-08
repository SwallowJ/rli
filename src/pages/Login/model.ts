import { message } from "antd";
import loginService from "./service";
import { namespace } from "./actions";
import { modelType } from "@/typings/model";
import securety from "@/common/core/securety";

const LoginModel: modelType<LOGIN.StateType> = {
    namespace,

    state: {
        loading: false,
        license: null,
        machineInfo: null,
        isLogin: securety.getLoginFlag(),
    },

    effects: {
        *login({ payload, remember }, { call, change }) {
            yield change({ loading: true });
            const token = yield call(loginService.getToken());

            if (!token) {
                return;
            }

            const _csrf: string = token.csrfToken;
            const [encodePassword, err] = WASM_CRYPTO_enAES(payload.password, _csrf);

            if (err) {
                message.error(err);
                return;
            }

            const params = { ...payload, _csrf, password: encodeURIComponent(encodePassword) };

            const response = yield call(loginService.login(params));
            if (response) {
                message.success("登录成功");
                securety.loginSuccess({ ...payload, _csrf }, remember);
                yield change({ isLogin: true });
            }

            yield change({ loading: false });
        },

        /**
         * 获取license
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
