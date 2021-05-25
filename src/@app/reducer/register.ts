/**
 * Author        feihongjiang
 * Date          2021-05-25
 * email         feihongjiang@caih.com
 * Description   注册model, 可在此处根据需求扩展
 */

import * as models from "@/@temp/models";

const __models = Object.values(models).map((model) => model.default);

export default [...__models];
