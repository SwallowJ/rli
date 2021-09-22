/**
 * Author     jfh
 * Date       2021-09-22 15:30:41.440
 * email      feihongjiang@caih.com
 * Desc       service 模板
 */

import { ReqService } from "@/common/request/service";

class AssertService extends ReqService {
    /**
     * 查询单位列表
     */
    listCorp(params: ASSERT.PARAMS.listCorp) {
        return this.get("/api/xc/corporation", { params });
    }
}

export default new AssertService();
