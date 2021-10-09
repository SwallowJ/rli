import { Actions } from "@/common/reducer/actions";

export const namespace = "System";

export class SystemActions extends Actions {
    /**
     * 下载文件
     */
    downloadFile(url: string, key: string, options?: REQUEST.reqInit, callbacks?: SYSTEM.fileCallback) {
        this.callAction("download", { payload: { url, options }, callbacks, key });
    }

    /**
     * 创建文件对象
     */
    createFileType() {}
}

export default new SystemActions(namespace);
