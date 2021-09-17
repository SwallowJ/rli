declare namespace Global {
    /**
     * 常用组件属性
     */
    interface component {
        className?: string;
        children?: React.ReactNode;
        style?: React.CSSProperties;
    }

    /**
     * 基本数据类型
     */
    type baseType = string | number | boolean;

    /**
     * 通用请求返回类型
     */
    interface resultData<T = any> {
        code: 0 | 1;
        data?: T;
        message?: string;
    }

    interface obj<T = number | string | boolean> {
        [key: string]: T;
    }

    namespace AUTH {
        /**
         * 用户信息
         */
        interface entity {
            /**
             * 角色ID
             */
            roleId: number;

            /**
             * 角色名
             */
            roleName: string;

            roleDesc?: number;

            /**
             * 用户ID
             */
            userId: number;

            /**
             * 用户昵称
             */
            userDisplayName?: string;

            /**
             * 用户单位名称
             */
            userCorporationName?: string;

            /**
             * 用户名
             */
            userName: string;

            email?: string;
            phone?: string;

            /**
             * 权限列表
             */
            basePermCategory?: string[];
        }

        interface changePwdType {
            newPassword: string;
            currentPassword: string;
            confirmPassword?: string;
        }
    }

    namespace LANGUAGE {
        /**
         * 语言类型
         */
        type Type = "zh_CN" | "en_US";

        /**
         * 语言类型
         */
        interface code {
            [key: string]: string;
        }

        type langType = code | undefined | null;

        /**
         * 语言包映射函数
         */
        type langFunc = (key?: string) => string;

        type langTempFunc = (key?: string, obj?: Global.obj) => string;
    }

    interface config {
        /**
         * git版本号
         */
        gitVer?: string;

        /**
         * git分支
         */
        branch?: string;

        /**
         * react版本号
         */
        react?: string;

        /**
         * webpack版本号
         */
        webpack?: string;

        /**
         * url前缀
         */
        prefix?: string;

        /**
         * 屏幕高度
         */
        screenHeight: number;
        
        NODE_ENV: "development" | "production" | "test";
    }
}
