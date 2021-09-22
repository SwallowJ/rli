/**
 * Author     jfh
 * Date       2021-09-18 15:31:25.189
 * email      feihongjiang@caih.com
 * Desc       service 模板
 */

import { ReqService } from "@/common/request/service";

class UserService extends ReqService {
    /**
     * 获取角色列表
     */
    list(params: USER.PARAMS.list) {
        return this.get<Global.Result<USER.entity[]>>("/api/xc/search/user/v2", { params }, { successResAll: true });
    }
}

export default new UserService();
