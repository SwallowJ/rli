import Config from "@/common/core/config";
import storage from "@/common/core/storage";
import request from "@/common/request/service";

class CommonService {
    /**
     * 获取语言包
     */
    getlanguagePackage(lang: string, name: string) {
        return request.get<LANGUAGE.langType>(
            `/language/${lang}/${name}.json`,
            {},
            { cache: Config.NODE_ENV === "production", key: `language_${lang}_${name}`, engine: storage.session }
        );
    }

    /**
     * 获取用户信息
     */
    getAuthInfo() {
        return request.get<Global.AUTH.entity>(`/api/xc/self`);
    }

    /**
     * 修改密码
     */
    changePassword(data: Global.AUTH.changePwdType) {
        return request.post("/api/xc/self/password", { data });
    }

    /**
     * 文件下载密码确认
     */
    downloadConfirm() {
        return request.get("/api/xc/setting/downloadConfirm");
    }
}

export default new CommonService();
