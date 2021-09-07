declare namespace LOGIN {
    interface StateType {
        /**
         * 证书
         */
        license?: licenseType;

        /**
         * 机器码
         */
        machineInfo?: machinceType;

        loading?: boolean;
    }

    type licenseType = license | null;
    type machinceType = machince | null;

    /**
     * 证书类型
     */
    interface license {
        edition: string;
        expiryDate: string;
        organization: string;
    }

    /**
     * 机器码
     */
    interface machince {
        machineInfo: string;
    }

    interface loginParams {
        username: string;
        password: string;
    }
}
