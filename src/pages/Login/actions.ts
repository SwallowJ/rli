import { Actions } from "@/common/reducer/actions";

export const namespace = "LOGIN";

export class LoginActions extends Actions {
    login(params: LOGIN.loginParams) {
        return this.callAction("login", { params });
    }
}

export default new LoginActions(namespace);
