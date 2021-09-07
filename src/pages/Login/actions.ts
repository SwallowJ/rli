import { Actions } from "@/common/reducer/actions";

export const namespace = "LOGIN";

export class LoginActions extends Actions {
    login(params: LOGIN.loginParams) {
        return this.callAction("login", { params });
    }

    getlicense() {
        return this.callAction("license");
    }
}

export default new LoginActions(namespace);
