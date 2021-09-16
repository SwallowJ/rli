import { ReqService } from "@/common/request/service";

class RoleService extends ReqService {
    /**
     * 查询所有角色类型
     */
    list(params: ROLE.PARAMS.list) {
        return this.get<ROLE.entity[]>("/api/xc/roleType", { params });
    }
}

export default new RoleService();
