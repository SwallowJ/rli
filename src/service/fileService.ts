import request from "@/common/request/service";

interface messsageType {
    type: string;
    name?: string;
    value: Global.obj;
}

class FileService {
    /**
     * 文件上传
     */
    upload(url: string, init?: REQUEST.reqInit) {
        return request.post(url, init);
    }
}

export default new FileService();
