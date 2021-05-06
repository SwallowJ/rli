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
