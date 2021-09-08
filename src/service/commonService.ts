import storage from "@/common/core/storage";
import { ReqService } from "@/common/request/service";

class CommonService extends ReqService {
    /**
     * 获取语言包
     */
    async getlanguagePackage(lang: string, name: string) {
        return this.get<Global.LANGUAGE.langType>(
            `/language/${lang}/${name}.json`,
            {},
            { cache: true, key: `language_${lang}_${name}`, engine: storage.session }
        );
    }

    /**
     * 获取用户信息
     */
    async getAuthInfo() {
        return this.get(`/api/xc/self`);
    }
}

export default new CommonService();
