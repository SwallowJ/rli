import { ReqService } from "@/common/request/service";

class FileService extends ReqService {
    /**
     * 文件上传
     */
    upload(url: string, init?: REQUEST.reqInit) {
        return this.post(url, init);
    }
}

export default new FileService();
