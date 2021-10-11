import { message } from "antd";
import service from "@/service/system";
import { modelType, Gen } from "@/typings/model";
import LanguageManager from "@/common/core/language";

export const namespace = "language";

const LanguageModel: modelType<LANGUAGE.StateType> = {
    namespace,

    state: {
        lang: LanguageManager.init(),
        login: {},
        layout: {},
    },

    effects: {
        *getPack({ name }, { call, select, change }): Gen<LANGUAGE.langType> {
            const { lang = "" } = select();
            const response = yield call(service.getlanguagePackage(lang, name));

            if (!response) {
                message.error(`语言包 ${lang}/${name}.json 不存在`);
                return;
            }

            yield change({ [name]: response });
        },

        *changeLanguage({ lang }, { change }) {
            LanguageManager.save(lang);
            change({ lang });
        },
    },

    reducers: {},
};

export default LanguageModel;
