import { message } from "antd";
import routers from "@/@temp/router";
import service from "@/service/system";
import loading from "@/component/Loading";
import { parseMenu } from "@/utils/utils";
import { modelType } from "@/typings/model";

export const namespace = "AUTH";

export interface AuthStateType {
    /**
     * 用户信息
     */
    auth?: Global.AUTH.entity;

    /**
     * 导航菜单
     */
    menus?: Aplication.routers;

    /**
     * 拥有权限的路由
     */
    paths?: string[];

    homePage?: string;
}

const AuthModel: modelType<AuthStateType> = {
    namespace,

    state: {
        menus: [],
        paths: [],
        homePage: "/",
    },

    effects: {
        *getAuthInfo({ callback }, { call, change }) {
            loading.run();
            const auth: Global.AUTH.entity = yield call(service.getAuthInfo());
            if (!auth) {
                return;
            }

            const router = routers.find((r) => r.key === "menu")?.routers || [];
            const [menus, paths] = parseMenu(router, Object.keys(auth.basePermissions).concat(auth.basePermCategory));
            const homePage = paths[0] ?? "/XC/home";
            change({ auth, menus, paths, homePage });
            callback && callback(homePage);
            loading.stop();
        },

        *changePassword({ payload, callback }, { call, language }) {
            loading.run();
            const response = yield call(service.changePassword(payload));

            if (response) {
                message.success(language("layout", "changePwd.success"));
                callback && callback();
            }
            loading.stop();
        },
    },

    reducers: {},
};

export default AuthModel;
