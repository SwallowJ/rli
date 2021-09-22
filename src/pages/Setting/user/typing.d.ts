declare namespace USER {
    interface StateType {
        userlist?: entity[];

        /**
         * 分页信息
         */
        page?: Global.pageType;

        /**
         * 待修改密码用户
         */
        changePwdId?: string;
    }

    interface entity extends Global.AUTH.entity {
        username: string;
    }

    namespace PARAMS {
        interface list extends Global.pageType {
            roleName?: string;
            usernameOrPhone?: string;
        }

        interface password {
            username: string;
            password: string;
        }
    }
}
