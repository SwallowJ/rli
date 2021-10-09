declare namespace SYSTEM {
    interface StateType {
        files?: fileStatus[];
    }

    /**
     * 文件上传/下载类型
     */
    interface fileStatus {
        key?: string;
        /**
         * 文件名称
         */
        filename?: string;

        /**
         * 文件大小
         */
        size?: number;

        /**
         * 创建时间
         */
        createTime: string;

        /**
         * 类型 0-上传 1-下载
         */
        type: 0 | 1;

        /**
         * TODO
         * 进度百分比 待实现
         */
        progress?: number;
    }

    type fileCallback = undefined | fileFunc;

    interface fileFunc {
        before?: Function;
        success?: Function;
        error?: Function;
        finally?: Function;
    }
}
