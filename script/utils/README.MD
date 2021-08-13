# 项目配置

## 文件路径配置

-   配置文件 **./config/paths.ts**

```ts
interface ConfigApi {
    /**
     * web入口文件
     */
    input?: string;

    /**
     * 打包输出文件
     */
    output?: string;
}
```

-   默认配置 **./script/utils/paths**

### 内容

1.  appPublic - web 静态文件
2.  appSrc - web 目录
3.  appTsConfig - ts 配置文件
4.  appJsConfig - js 配置文件

## 环境变量

-   配置文件 **{NODE_ENV}?.{local}?.env**

### 优先级

1. \${NODE_ENV}.local.env
2. \${NODE_ENV}.env
3. local.env
4. .env

## 打包配置

**js 压缩插件对比 _2021-08-13 15:00:00_**

| js 压缩插件            | 结果大小(kb) | 耗时(s) | 备注                                |
| ---------------------- | ------------ | ------- | ----------------------------------- |
| esbuild-loader         | 4188.22      | 11.392  | css 压缩插件, 代替 babel(!按需加载) |
| esbuild-webpack-plugin | 4771.84      | 13.750  |                                     |
| terser-webpack-plugin  | 4782.80      | 16.189  | 无 ts 代码提示                      |
| -                      | 5692.32      | 11.339  |
