# 项目配置

## 文件路径配置

-   配置文件 **./config/paths.ts**

### 内容

1.  appBuild - 编译输出目录
2.  appIndexJs - web 入口文件
3.  appPublic - web 静态文件
4.  appSrc - web 目录
5.  appTsConfig - ts 配置文件
6.  appJsConfig - js 配置文件

## 环境变量

-   配置文件 **{NODE_ENV}?.{local}?.env**

### 优先级

1. \${NODE_ENV}.local.env
2. \${NODE_ENV}.env
3. local.env
4. .env
