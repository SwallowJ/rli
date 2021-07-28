import { modelType } from "@/typings/model";
import LanguageManager from "@/common/core/language";

export interface LangStateType {
    lang?: Global.langType;
}

const LanguageModel: modelType<LangStateType> = {
    namespace: "language",

    state: {
        lang: LanguageManager.init(),
    },

    effects: {},

    reducers: {},
};

export default LanguageModel;
