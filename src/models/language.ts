import { modelType } from "@/typings/model";
import LanguageManager from "@/common/core/language";

export interface LangStateType {
    lan?: Global.langType;
}

const LanguageModel: modelType<LangStateType> = {
    namespace: "language",

    state: {
        lan: LanguageManager.init(),
    },

    effects: {},

    reducers: {},
};

export default LanguageModel;
