import { modelType } from "@/typings/model";

export interface LangStateType {}

const TestModel: modelType<LangStateType> = {
    namespace: "test",

    state: {},

    effects: {},

    reducers: {},
};

export default TestModel;
