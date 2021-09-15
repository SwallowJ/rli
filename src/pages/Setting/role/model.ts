import { message } from "antd";
import roleService from "./service";
import { namespace } from "./actions";
import loading from "@/component/Loading";
import { modelType } from "@/typings/model";

const RoleModel: modelType<ROLE.StateType> = {
    namespace,

    state: {},

    effects: {},

    reducers: {},
};

export default RoleModel;
