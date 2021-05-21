# 配置

## 项目配置<h2 id="config">

### 配置文件

配置文件(按文件优先级排序, 优先级高的会覆盖优先级低的配置内容):

1. **config.\${NODE_ENV}.local.[t|j]s**  
   根据 NODE_ENV 环境变量加载的 **本地** 配置文件，有限级最高

2. **config.\${NODE_ENV}.[t|j]s**  
   根据 NODE_ENV 环境变量加载的配置文件

3. **config.local.[t|j]s**  
   **本地** 临时配置文件

4. **config.[t|j]s**  
   配置文件

### 配置内容

详见: [typing/config.d.ts] **ConfigApi**

1. 使用方法 **ConfigApi** 包裹以获得更好的配置提示

示例：

```ts
import { ConfigApi } from "../script/utils/tools";

export default ConfigApi({
    port: 3000,
});
```

2. 初始默认配置信息

详见 <script/utils/config.ts> **resolveConfig**

## 路由配置

### 配置文件

配置文件(按文件优先级排序, 按优先级加载):

1. **router.\${NODE_ENV}.local.[t|j]s**
2. **router.\${NODE_ENV}.[t|j]s**
3. **router.local.[t|j]s**
4. **router.[t|j]s**

### 配置内容

详见: [typing/config.d.ts] **RouterApi**

1. 使用方法 **RouterApi** 包裹以获得更好的配置提示

示例：

```ts
import { RouterApi } from "../script/utils/tools";

export default RouterApi([
    {
        path: "/graphVisual",
        routers: [
            {
                path: "/graphVisual/x6",
                component: "@/pages/GraphicVisual/x6",
            },
        ],
    },
]);
```

### 路由加载方式

1. 脚本文件 _script/utils/config.ts_.**loadRouter**

2. 路由配置会被加载到目录 src/@temp.router.tsx, 被组件 _src/@app/router/index.ts_ 调用

3. 使用路由组件 [**react-router-dom**](https://reactrouter.com/web/api/Route)

4. 懒加载, 当前使用基于 [**@loadable/component**](https://loadable-components.com/docs/getting-started/) 的代码分割, 如有其它需求可修改相关脚本文件
