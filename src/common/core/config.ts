import config from "@/@temp/config";

const GlobalConfig: Global.config = {
    ...config,
    screenHeight: window.screen.height,
    formLayout: {
        default: { labelCol: { span: 6 }, wrapperCol: { span: 14 } },
    },
};

export default GlobalConfig;
