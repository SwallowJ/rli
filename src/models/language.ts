import { modelType, Gen } from "@/typings/model";
import commonService from "@/service/commonService";
import LanguageManager from "@/common/core/language";

export const namespace = "language";

export interface LangStateType {
    lang?: Global.LANGUAGE.Type;
    login?: Global.LANGUAGE.code;
}

const LanguageModel: modelType<LangStateType> = {
    namespace,

    state: {
        lang: LanguageManager.init(),
        login: {},
    },

    effects: {
        *getPack({ name }, { call, select, change }): Gen<Global.LANGUAGE.langType> {
            const { lang = "" } = select();
            const response = yield call(commonService.getlanguagePackage(lang, name));

            if (!response) {
                commonService.message.error(`语言包 ${lang}/${name}.json 不存在`);
                return;
            }

            yield change({ [name]: response });
        },
    },

    reducers: {},
};

export default LanguageModel;
