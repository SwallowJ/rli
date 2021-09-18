declare namespace ROLE {
    interface StateType {
        /**
         * 角色列表
         */
        rolelist?: entity[];

        /**
         * 权限列表
         */
        perms?: permType[];

        /**
         * 待编辑角色
         */
        editRole?: entity | null;
    }

    /**
     * 用户拥有的权限
     */
    interface permissions {
        hidden: boolean;
        permission: string;
        readOnly: boolean;
        removable: boolean;
        roleName: string;
    }

    /**
     * 角色类型
     */
    interface entity {
        createdDate?: string;
        permissions: permissions[];
        roleHidden?: boolean;
        roleId: number | string;
        roleName: string;
        roleReadonly?: boolean;
        roleRemovable?: boolean;
        roleType?: number;
        updatedDate?: string;
        roleDesc: string;
    }

    /**
     * 权限项
     */
    interface permCode {
        permissonCode: string;
        permissonName: string;
    }

    /**
     * 权限类型
     */
    interface permType {
        categoryCode: string;
        categoryName: string;
        forProject: boolean;
        permissonList: permCode[];
        permissonCode?: string;
        permissonName?: string;
    }

    namespace PARAMS {
        interface list {
            searchKey?: string;
        }

        interface create {
            newRole: {
                roleName: string;
                roleType: string;
                roleDesc: string;
            };
            permissions: string[];
        }

        interface del {
            roleName: string;
        }

        interface roleForm {
            roleName: string;
            permissions: string[];
        }

        interface updata {
            roleName: string;
            permissions: string[];
        }
    }
}
