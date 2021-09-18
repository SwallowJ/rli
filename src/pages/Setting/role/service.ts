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

    /**
     * 删除角色
     */
    deleteRole(data: ROLE.PARAMS.del) {
        return this.delete(`/api/xc/role/${data.roleName}`, { data });
    }

    /**
     * 更新权限
     */
    updataPerm(data: ROLE.PARAMS.updata) {
        return this.post(`/api/xc/role/${data.roleName}`, { data });
    }
}

export default new RoleService();
