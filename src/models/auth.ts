import { message } from "antd";
import routers from "@/@temp/router";
import loading from "@/component/Loading";
import { parseMenu } from "@/utils/utils";
import { modelType } from "@/typings/model";
import security from "@/common/core/security";
import commonService from "@/service/commonService";

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
            const auth: Global.AUTH.entity = yield call(commonService.getAuthInfo());
            if (!auth) {
                return;
            }

            const router = routers.find((r) => r.key === "menu")?.routers || [];

            const [menus, paths] = parseMenu(router, auth.basePermCategory || []);
            const homePage = paths[0] ?? "/XC/home";
            change({ auth, menus, paths, homePage });
            callback && callback(homePage);
            loading.stop();
        },

        *changePassword({ payload, callback }, { call, language }) {
            loading.run();
            const response = yield call(commonService.changePassword(payload));

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
