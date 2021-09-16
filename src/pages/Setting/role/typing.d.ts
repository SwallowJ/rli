declare namespace ROLE {
    interface StateType {
        /**
         * 角色列表
         */
        rolelist?: entity[];
    }

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
        permission: permissions[];
        roleHidden?: boolean;
        roleId: number | string;
        roleName: string;
        roleReadonly?: boolean;
        roleRemovable?: boolean;
        roleType?: number;
        updatedDate?: string;
    }

    namespace PARAMS {
        interface list {
            searchKey?: string;
        }
    }
}
