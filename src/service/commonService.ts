import storage from "@/common/core/storage";
import { ReqService } from "@/common/request/service";

class CommonService extends ReqService {
    /**
     * 获取语言包
     */
    getlanguagePackage(lang: string, name: string) {
        return this.get<Global.LANGUAGE.langType>(
            `/language/${lang}/${name}.json`,
            {},
            { cache: true, key: `language_${lang}_${name}`, engine: storage.session }
        );
    }

    /**
     * 获取用户信息
     */
    getAuthInfo() {
        return this.get<Global.AUTH.entity>(`/api/xc/self`);
    }

    /**
     * 修改密码
     */
    changePassword(data: Global.AUTH.changePwdType) {
        return this.post("/api/xc/self/password", { data });
    }
}

export default new CommonService();
