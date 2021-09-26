/**
 * Author     jfh
 * Date       2021-09-24 10:37:41.136
 * email      feihongjiang@caih.com
 * Desc       actions 模板
 */

import { Actions } from "@/common/reducer/actions";
import timeutils from "@/utils/time";

export const namespace = "LOG";

export class LogActions extends Actions {
    list(usernameOrDisplayName?: string, timeRange?: TIME.range, page?: number, pageSize?: number) {
        const begin = timeRange?.[0] ? timeutils.format(timeRange[0], "YYYY-MM-DD 00:00:00") : null;
        const end = timeRange?.[1] ? timeutils.format(timeRange[1], "YYYY-MM-DD 23:59:59") : null;

        return this.callAction("list", { payload: { end, page, begin, pageSize, usernameOrDisplayName } });
    }
}

export default new LogActions(namespace);
