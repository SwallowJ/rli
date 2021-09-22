declare namespace USER {
    interface StateType {
        userlist?: entity[];

        /**
         * 分页信息
         */
        page?: Global.pageType;
    }

    interface entity extends Global.AUTH.entity {}

    namespace PARAMS {
        interface list extends Global.pageType {
            roleName?: string;
            usernameOrPhone?: string;
        }
    }
}
