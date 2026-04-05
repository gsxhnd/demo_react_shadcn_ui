# 架构说明

本文档描述当前仓库已经落地的实现方式，以及后续继续演进时应遵循的核心边界。

## 设计目标

这个项目当前的目标不是构建一套完整业务系统，而是提供一个可持续演进的 React starter template。

设计重点：

- 让新项目可以快速启动，而不是从零拼装基础设施
- 在模板阶段就明确路由、状态、请求层和 UI 层的职责边界
- 用真实代码承载约定，避免文档和实现长期脱节
- 保留少量演示页面，用于说明模板能力的接入方式

## 技术栈

### 核心框架

- React 19
- TypeScript 5
- Vite 8

### 应用层能力

- React Router 7
- Redux Toolkit
- TanStack Query
- i18next + react-i18next

### UI 与样式

- shadcn/ui
- Base UI
- Tailwind CSS 4
- lucide-react

### 工程化

- ESLint
- Prettier
- Vitest
- Testing Library
- React Compiler

## 当前目录职责

当前项目结构以实际代码为准，不假设尚未落地的 `features/` 或 `services/` 目录。

```text
src/
├── components/
│   ├── error-boundary.tsx
│   └── ui/
├── i18n/
│   └── locales/
├── lib/
├── pages/
├── routes/
├── store/
│   └── slices/
├── test/
├── App.tsx
├── AppRouter.tsx
├── index.css
└── main.tsx
```

各目录职责如下：

- `components/ui/`: 通用 UI 基础组件，优先承载可复用组件
- `components/error-boundary.tsx`: 跨页面错误兜底组件
- `pages/`: 页面级组件和演示页面
- `routes/`: 路由定义与页面入口映射
- `store/`: Redux store 配置与全局 slice
- `lib/`: API 请求、错误处理、Query 配置和通用工具
- `i18n/`: 国际化初始化和语言资源
- `test/`: 当前已落地的 Vitest 测试

## 应用启动链路

启动链路如下：

1. `src/main.tsx` 初始化主题、Redux Provider、QueryClientProvider 和 i18n
2. `src/AppRouter.tsx` 通过 `RouterProvider` 挂载路由
3. `src/routes/index.tsx` 懒加载页面并生成 browser router
4. 页面内部再按需要消费 store、query 和 i18n 能力

这条链路已经足够支撑模板继续扩展新的业务页面。

## 路由设计

当前路由均通过 `lazy()` 实现页面级懒加载，集中定义在 `src/routes/index.tsx`。

现有路由：

- `/`: 首页
- `/api-demo`: API 和图标演示页
- `/components`: 组件示例页
- `/components/docs`: 组件文档页
- `*`: 404 页面

当前路由层特点：

- 入口集中，便于模板维护
- 页面级代码分割已经具备
- 暂未引入鉴权守卫、布局路由和权限分层

后续若新增业务模块，建议优先保持现有集中式路由管理；当页面数量明显增加后，再考虑拆分模块化路由文件。

## 状态管理边界

当前项目采用三层状态划分：

### Redux Toolkit

用于全局客户端状态，当前已落地：

- `user`
- `theme`

适合放入 Redux 的内容：

- 跨页面共享的 UI 偏好
- 当前用户信息
- 需要被多个页面消费的客户端配置

### TanStack Query

用于服务端状态，当前通过 `src/lib/queryClient.ts` 和 `src/lib/useApiQuery.ts` 提供基础能力。

适合放入 Query 的内容：

- 列表查询
- 详情查询
- 与缓存、失效、重试直接相关的数据访问

### 组件本地状态

保留在页面或组件内部，用于：

- 表单输入
- 临时交互状态
- 纯展示层切换逻辑

当前边界原则：不要把服务端数据硬塞进 Redux，也不要把所有交互都提前抽成全局状态。

## API 请求层设计

请求层分为四部分：

### `src/lib/api.ts`

- 提供 `get`、`post`、`put`、`patch`、`delete`
- 统一拼接 `VITE_API_BASE_URL`
- 解析 JSON 响应
- 统一抛出 `AppError`

### `src/lib/apiInterceptor.ts`

- 提供请求和响应拦截器管理器
- 默认给请求补充 `Content-Type`
- 为 GET 请求附加时间戳参数
- 提供取消请求与超时信号能力

### `src/lib/error-handler.ts`

- 定义 `AppError`
- 提供网络错误、HTTP 错误和未知错误分类
- 提供用户可读错误消息和重试判断

### `src/lib/useApiQuery.ts`

- 封装通用查询和突变 hook
- 提供 `queryKeys` 工厂
- 示例化展示用户列表、详情、创建、更新、删除等模式

当前请求层适合作为模板基础，但仍属于轻量封装。后续若要进入更稳定的业务模板阶段，可以继续增加：

- 鉴权 token 注入
- 更严格的响应数据 schema 校验
- 更明确的业务 API 分层

## 国际化方案

国际化初始化位于 `src/i18n/index.ts`，当前特征如下：

- 内置语言：`zh`、`en`、`ja`、`ko`
- 使用 `i18next-browser-languagedetector`
- 优先从 `localStorage` 读取语言
- 当前语言缓存键为 `language`
- 翻译资源以 TypeScript 对象形式维护在 `src/i18n/locales/`

当前方案适合模板阶段快速迭代。若未来翻译规模继续扩大，可以再考虑按业务域拆分词条文件。

## 主题机制

主题状态位于 `src/store/slices/themeSlice.ts`。

当前支持：

- `light`
- `dark`
- `system`

实现方式：

- 主题值存储在 Redux 中
- 同步持久化到 `localStorage`
- 通过给 `document.documentElement` 切换 `dark` class 驱动主题

当前实现足以支撑模板使用，但需要注意：

- 主题核心逻辑实际更依赖 DOM 和本地存储，而不是复杂全局状态
- 后续可评估是否继续保留 Redux 承载主题，或改为更轻量的主题管理方案

## UI 组件组织方式

`src/components/ui/` 是当前模板的组件基础层，主要承载通用组件与 shadcn/ui 封装。

现有页面中：

- `/components` 用于示例展示
- `/components/docs` 用于文档说明

这意味着当前项目已经具备“组件代码 + 使用示例 + 文档页”的基础闭环。

后续建议：

- 通用组件继续放在 `components/ui/`
- 业务组合组件在未来按模块落位
- 组件文档优先描述使用约定，而不是堆砌所有 props

## 测试现状

当前测试集中在 `src/test/`，已覆盖的内容主要包括：

- API 辅助函数
- 错误处理工具
- loading hooks

当前测试结论：

- 已具备基础测试运行能力
- 仍以工具函数和 hooks 为主
- 页面级和路由级测试还没有系统建立
- E2E 测试尚未接入

因此，当前状态应描述为“已有测试基础设施”，而不是“测试体系已完善”。

## 工程配置摘要

### Vite

- 配置了 `@` 指向 `src`
- 启用了 React Compiler Babel preset
- 启用了 Tailwind Vite 插件
- 构建默认进行代码分割和 esbuild 压缩

### ESLint

- 当前为基础规则集
- 已覆盖 TypeScript、React Hooks 和 Vite HMR 相关规则
- 还没有启用类型感知的更严格规则

## 当前限制与待整理项

以下内容是当前模板继续迭代时需要正视的真实情况：

1. `src/App.tsx` 更像初期示例页面，目前并不是主入口的一部分，后续需要明确保留或清理策略。
2. 组件文档页以静态内容为主，内容量继续增长后需要考虑拆分数据源。
3. API hooks 中的用户示例仍偏 demo 性质，后续可替换为更接近业务模板的模块示例。
4. 部分依赖已安装，但是否都在当前主流程中使用，需要后续进一步清点。
5. 当前目录还没有形成明确的业务模块分层规范，后续扩展时需要收敛。

## 演进原则

后续继续迭代时，建议遵循以下原则：

- 先让文档描述真实实现，再推动实现演进
- 优先补齐模板使用体验，而不是继续堆叠零散 demo
- 新增能力时同步明确它属于路由、组件、状态还是请求层
- 当目录和职责开始复杂化时，再引入模块化拆分，不提前设计过度结构
