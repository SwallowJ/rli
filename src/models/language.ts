import { modelType } from "@/typings/model";

export interface LangStateType {}

const LanguageModel: modelType<LangStateType> = {
    namespace: "language",

    state: {},

    effects: {},

    reducers: {},
};

export default LanguageModel;
