import request from "@/common/request/service";

class RoleService {
    /**
     * 查询所有角色类型
     */
    list(params: ROLE.PARAMS.list) {
        return request.get<ROLE.entity[]>("/api/xc/roleType", { params });
    }

    /**
     * 查询权限列表
     * TODO 可缓存
     */
    listPermision() {
        return request.get<ROLE.permType>("/api/xc/perm");
    }

    /**
     * 创建角色
     */
    create(data: ROLE.PARAMS.create) {
        return request.post("/api/xc/roleWithPerm", { data });
    }

    /**
     * 删除角色
     */
    deleteRole(data: ROLE.PARAMS.del) {
        return request.delete(`/api/xc/role/${data.roleName}`, { data });
    }

    /**
     * 更新权限
     */
    updataPerm(data: ROLE.PARAMS.updata) {
        return request.post(`/api/xc/role/${data.roleName}`, { data });
    }
}

export default new RoleService();
