import { ReqService } from "@/common/request/service";

class CommonService extends ReqService {
    /**
     * 获取语言包
     */
    async getlanguagePackage(lang: string, name: string) {
        return this.get<Global.resultType<Global.LANGUAGE.langType>>(`/language/${lang}/${name}.json`);
    }
}

export const commonService = new CommonService();
