declare namespace Global {
    /**
     * 常用组件属性
     */
    interface component {
        className?: string;
        children?: React.ReactNode;
        style?: React.CSSProperties;
    }

    /**
     * 语言类型
     */
    type langType = "zh-CN" | "en-US" | string;

    /**
     * 基本数据类型
     */
    type baseType = string | number | boolean;
}
