import { ReqService } from "@/common/request/service";

class CommonService extends ReqService {
    /**
     * 获取语言包
     */
    async getlanguagePackage(lang: string, name: string) {
        return this.get<Global.LANGUAGE.langType>(`/language/${lang}/${name}.json`);
    }

    /**
     * 获取用户信息
     */
    async getAuthInfo() {
        return this.get(`/api/xc/self`);
    }
}

export const commonService = new CommonService();
