import { DataNode } from "antd/lib/tree";
import { Actions } from "@/common/reducer/actions";

export const namespace = "ROLE";

export class RoleActions extends Actions {
    listRole(searchKey?: string) {
        return this.callAction("list", { params: { searchKey } });
    }

    listPermision() {
        return this.callAction("listPermision");
    }

    /**
     * 创建角色
     */
    create(payload: ROLE.PARAMS.create, callback?: Function) {
        return this.callAction("createRole", { payload, callback });
    }

    /**
     * 权限树解析
     */
    parsePermTree(perm: ROLE.permType[], parent?: ROLE.permType): DataNode[] {
        if (!Array.isArray(perm)) {
            return [];
        }

        return perm.map((p) => ({
            disableCheckbox: parent?.forProject,
            key: p.categoryCode ?? p.permissonCode,
            title: p.categoryName ?? p.permissonName,
            children: this.parsePermTree(p.permissonList as ROLE.permType[], p),
        }));
    }
}

export default new RoleActions(namespace);
