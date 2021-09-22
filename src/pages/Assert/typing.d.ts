declare namespace ASSERT {
    interface StateType {
        /**
         * 单位列表
         */
        corporations?: corporation[];
    }

    interface corporation {
        id: Global.ID;
        corporationName: string;
        corporationType: corpType;
        corporationShortName: string;
    }

    type corpType = "MANUFACTURER" | "INTEGRATOR" | "CONSUMER";

    namespace PARAMS {
        interface listCorp extends Global.pageType {
            includeType?: corpType;
            excludeType?: corpType;
        }
    }
}
