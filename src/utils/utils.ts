/**
 * 权限树解析
 */
export const parseMenu = (routers: Aplication.routers, basePermCategory: string[]): [Aplication.routers, string[]] => {
    const paths: string[] = [];
    const menus: Aplication.routers = [];

    for (let i = 0; i < routers.length; i++) {
        const r = routers[i];
        const permission: Aplication.permissionType = r.data?.["permission"];

        if (permission === false) {
            continue;
        }

        let temp: Aplication.router | null = null;
        /**
         * permission 缺省或者为true代表不需要权限
         */
        if (permission === undefined || permission === true) {
            temp = r;
        } else if (Array.isArray(permission) && permission.every((pr) => basePermCategory.includes(pr))) {
            temp = r;
        }

        if (temp) {
            if (temp.routers) {
                const [nm, np] = parseMenu(temp.routers, basePermCategory);

                /**
                 * permission 若为空数组，且没有满足权限的子节点，则无权限
                 */
                if (Array.isArray(permission) && permission.length === 0 && nm.length === 0) {
                    continue;
                }

                temp.routers = nm;
                paths.push(...np);
            }

            /**
             * 将name不为空的添加到导航菜单栏
             */
            temp.name && menus.push(temp);
            paths.push(r.path);
        }
    }
    return [menus, paths];
};
