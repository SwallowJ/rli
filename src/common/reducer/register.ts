/**
 * Author        feihongjiang
 * Date          2021-05-25
 * email         feihongjiang@caih.com
 * Description   注册model, 可在此处根据需求扩展
 */

import * as models from "@/@temp/models";
import { ReducersMapObject } from "@/typings/model";

const __models = Object.values(models).map((model) => model.default);

const commonReducer: ReducersMapObject = {
    changeStage(state, { params }) {
        return { ...state, ...params };
    },
};

//@ts-ignore
export default [...__models].map((x) => ({ ...x, reducers: { ...commonReducer, ...x.reducers } }));
