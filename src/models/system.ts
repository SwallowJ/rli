import { message } from "antd";
import timeUtils from "@/utils/time";
import service from "@/service/system";
import { Random } from "@/utils/functools";
import { modelType } from "@/typings/model";
import { namespace } from "@/actions/system";
import security from "@/common/core/security";
import fileService from "@/service/fileService";

const SystemModel: modelType<SYSTEM.StateType> = {
    namespace,

    state: {
        files: [],
        downloadConfirm: false,
    },

    effects: {
        *download({ url, options, callbacks, key }, { call, change, select, put, languageTemp }) {
            const funcs: SYSTEM.fileCallback = callbacks;
            funcs?.before?.();
            key = key ?? Random.string();
            const status: SYSTEM.fileStatus = { key, type: 1, createTime: timeUtils.now() };
            const { files, downloadConfirm } = select();
            yield change({ files: [status, ...(files || [])] });

            if (downloadConfirm) {
                const password = yield call(fileService.confirmPassword());

                if (!password) {
                    funcs?.finally?.();
                    return;
                }

                const [confirmPassword, err] = WASM_CRYPTO_enAES(password, security.getCsrfToken());
                if (err) {
                    message.error(err);
                    return;
                }
                options.params.confirmPassword = encodeURIComponent(confirmPassword);
            }

            const filename = yield call(fileService.download(url, options));
            if (filename) {
                message.success(languageTemp("system", { filename }, "file.download"));
                funcs?.success?.();
            } else {
                funcs?.error?.();
            }

            yield put({ type: "removeFiles", key });
            funcs?.finally?.();
        },

        *downloadConfirm(_, { call, change }) {
            const response = yield call(service.downloadConfirm());
            yield change({ downloadConfirm: Boolean(response) });
        },
    },

    reducers: {
        removeFiles(state, { key }) {
            const files = state?.files?.filter((f) => f.key !== key);
            return { ...state, files };
        },
    },
};

export default SystemModel;
