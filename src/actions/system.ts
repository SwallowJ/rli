import { Actions } from "@/common/reducer/actions";

export const namespace = "System";

export class SystemActions extends Actions {
    /**
     * 下载文件
     */
    downloadFile(url: string, key: string, options?: REQUEST.reqInit, callbacks?: SYSTEM.fileCallback) {
        this.callAction("download", { url, options, callbacks, key });
    }

    /**
     * 下载文件是否需要密码校验
     */
    downloadConfirm() {
        this.callAction("downloadConfirm");
    }
}

export default new SystemActions(namespace);
