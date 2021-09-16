import config from "@/@temp/config";

const GlobalConfig: Global.config = {
    ...config,
    screenHeight: window.screen.height,
};

export default GlobalConfig;
