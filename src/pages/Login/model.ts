import loginService from "./service";
import { namespace } from "./actions";
import loading from "@/component/Loading";
import { modelType } from "@/typings/model";
import security from "@/common/core/security";

const LoginModel: modelType<LOGIN.StateType> = {
    namespace,

    state: {
        license: null,
        machineInfo: null,
        isLogin: security.getLoginFlag(),
    },

    effects: {
        *login({ payload, remember }, { call, change }) {
            loading.run();
            const token: LOGIN.tokenType = yield call(loginService.getToken());

            if (!token) {
                return;
            }

            const requestId: string = token.csrfToken;
            const [encodePassword, err] = WASM_CRYPTO_enAES(payload.password, requestId);

            if (err) {
                loginService.message.error(err);
                return;
            }

            const params = { ...payload, requestId, password: encodeURIComponent(encodePassword) };

            const _token: string = yield call(loginService.login(params));
            if (_token) {
                loginService.message.success("登录成功");
                security.login({ ...payload, requestId, _token }, remember);
                yield change({ isLogin: true });
            }
            loading.stop();
        },

        *logout(_, { call }) {
            const response = yield call(loginService.logout());

            if (response) {
                security.unauthorized();
            }
        },

        /**
         * 获取license
         */
        *license(_, { call, change }) {
            loading.run();
            const license: LOGIN.licenseType = yield call(loginService.getlicense());

            yield change({ license });
            if (!license) {
                const machineInfo: LOGIN.machinceType = yield call(loginService.getMachineInfo());
                yield change({ machineInfo });
            }
            loading.stop();
        },
    },

    reducers: {},
};

export default LoginModel;
