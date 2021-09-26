declare namespace LOG {
    interface StateType {
        logs?: entity[];
        page?: Global.pageType;

        /**
         * 详细信息
         */
         detailInfo?: entity | null;
    }

    interface entity {
        type: string;
        eventTime: string;
        objDisplayName?: string;
        roleDisplayName: string;
        typeDisplayName: string;
        userDisplayName: string;
        refTargetValue?: string;
        refOriginValue?: string;
        refOriginDetail?: Global.obj<any>;
        refTargetDetail?: Global.obj<any>;
        obj?: Global.obj<any>;
    }

    namespace PARAMS {
        interface list extends Global.pageType {
            begin?: string;
            end?: string;
            usernameOrDisplayName?: string;
        }
    }
}
