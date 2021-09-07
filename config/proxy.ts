import { ProxyConfig } from "../script/utils/tools";

const defautlConfig = (target: string) => ({ target, changeOrigin: true });

export default ProxyConfig({
    virtual: {
        "/api/v1": defautlConfig("http://172.17.144.2:6001"),
    },
    dev_25: {
        "/api/xc": defautlConfig("http://10.19.6.25:8080"),
        "/xc": defautlConfig("http://10.19.6.25:8080"),
    },
    dev_wufeng: {
        "/api/xc": defautlConfig("http://10.8.13.204:8081"),
        "/xc": defautlConfig("http://10.19.6.25:8080"),
    },
});
