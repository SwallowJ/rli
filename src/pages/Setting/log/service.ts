/**
 * Author     jfh
 * Date       2021-09-24 10:37:41.160
 * email      feihongjiang@caih.com
 * Desc       service 模板
 */

import request from "@/common/request/service";

class LogService {
    /**
     * 获取操作日志
     */
    list(params: LOG.PARAMS.list) {
        return request.get<Global.Result<LOG.entity[]>>("/api/xc/log/new", { params }, { successResAll: true });
    }
}

export default new LogService();
