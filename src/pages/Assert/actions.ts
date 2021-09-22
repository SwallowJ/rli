/**
 * Author     jfh
 * Date       2021-09-22 15:30:41.433
 * email      feihongjiang@caih.com
 * Desc       actions 模板
 */

import { Actions } from "@/common/reducer/actions";

export const namespace = "ASSERT";

export class AssertActions extends Actions {
    /**
     * 获取单位列表
     */
    listCorp(includeType?: string, excludeType?: string, pageNum?: number, pageSize?: number) {
        return this.callAction("listCorp", { payload: { includeType, excludeType, pageNum, pageSize } });
    }
}

export default new AssertActions(namespace);
