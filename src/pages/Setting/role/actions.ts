import { Actions } from "@/common/reducer/actions";

export const namespace = "ROLE";

export class RoleActions extends Actions {
    listRole(searchKey?: string) {
        return this.callAction("list", { params: { searchKey } });
    }
}

export default new RoleActions(namespace);
