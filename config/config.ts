import { ConfigApi } from "../script/utils/tools";

export default ConfigApi({
    port: 8080,
    input: "src/@app/index",
    disableHostCheck: true,
});
