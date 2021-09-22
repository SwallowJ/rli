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

        /**
         * 待编辑用户详情
         */
        editInfo?: entity;
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

        interface userId {
            userId: number;
        }

        interface form {
            username: string;
            displayName: string;
            phone?: string;
            email?: string;
            role: string;
            roles?: string[];
            corporationId?: string;
        }
    }
}
