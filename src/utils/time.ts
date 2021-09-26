/**
 * Author     jfh
 * Date       2021-09-24
 * email      feihongjiang@caih.com
 * Desc       时间处理工具
 */

import moment from "moment";

class TimeUtils {
    /**
     * 判断两个时间是否相等
     */
    equal(t1: TIME.timeType, t2: TIME.timeType) {
        return !t1 || !t2 ? t1 == t2 : +moment(t1) === +moment(t2);
    }

    /**
     * 判断时间范围是否相等
     */
    equalRange(r1: TIME.range, r2: TIME.range) {
        return !r1 || !r2 ? r1 == r2 : this.equal(r1[0], r2[0]) && this.equal(r1[1], r2[1]);
    }

    format(stamp: TIME.timeType, format: string): string {
        if (stamp == null || stamp == undefined) {
            return "-";
        }
        return moment(stamp).utc(true).format(format);
    }
}

export default new TimeUtils();
