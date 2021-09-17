import { ReqService } from "@/common/request/service";

class RoleService extends ReqService {
    /**
     * 查询所有角色类型
     */
    list(params: ROLE.PARAMS.list) {
        return this.get<ROLE.entity[]>("/api/xc/roleType", { params });
    }

    /**
     * 查询权限列表
     * TODO 可缓存
     */
    listPermision() {
        return this.get<ROLE.permType>("/api/xc/perm");
    }

    /**
     * 创建角色
     */
    create(data: ROLE.PARAMS.create) {
        return this.post("/api/xc/roleWithPerm", { data });
    }
}

export default new RoleService();
