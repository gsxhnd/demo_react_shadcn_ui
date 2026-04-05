# React Starter Template

一个面向团队协作和后续业务扩展的 React 前端模板。

当前仓库不是单纯的技术点 demo 集合，而是一个已经接入常见前端基础设施的 starter template，目标是让使用者可以直接基于它继续开发页面、接入接口和沉淀组件。

## 项目定位

- 基于 React 19、TypeScript 和 Vite 的现代前端模板
- 预置路由、全局状态、服务端状态、国际化、主题切换和基础测试能力
- 保留若干演示页面，用于展示模板能力和约定的使用方式
- 适合作为中小型后台、运营平台、内容平台或管理台项目的起点

## 已集成能力

- React 19 + TypeScript + Vite 8
- React Router 7 路由与页面懒加载
- Redux Toolkit 全局状态管理
- TanStack Query 服务端状态管理
- 基于 `fetch` 的 API 请求封装、拦截器和统一错误处理
- shadcn/ui + Tailwind CSS 4 UI 基础设施
- lucide-react 图标体系
- i18next 多语言支持，当前内置 `zh`、`en`、`ja`、`ko`
- 亮色、暗色、跟随系统三种主题模式
- Vitest + Testing Library 基础测试能力
- React Compiler 和基础 ESLint 配置

## 快速启动

```bash
npm install
npm run dev
```

默认开发地址由 Vite 提供，构建命令如下：

```bash
npm run build
```

## 常用命令

| 命令                    | 说明                      |
| ----------------------- | ------------------------- |
| `npm run dev`           | 启动开发环境              |
| `npm run build`         | TypeScript 构建检查并打包 |
| `npm run preview`       | 本地预览构建产物          |
| `npm run lint`          | 运行 ESLint               |
| `npm run lint:fix`      | 自动修复可修复问题        |
| `npm run fmt`           | 使用 Prettier 格式化项目  |
| `npm run test`          | 启动 Vitest               |
| `npm run test:coverage` | 生成测试覆盖率报告        |

## 页面入口

当前模板包含以下页面入口，可用于快速理解项目能力边界：

| 路径               | 说明                                   |
| ------------------ | -------------------------------------- |
| `/`                | 首页，展示模板能力总览、主题和语言切换 |
| `/api-demo`        | API 封装、图标系统和 Query hooks 示例  |
| `/components`      | UI 组件示例页                          |
| `/components/docs` | 当前已封装组件的文档页                 |

## 目录概览

```text
src/
├── components/         # 通用组件与 UI 组件
├── i18n/               # 多语言配置与语言包
├── lib/                # API、Query、错误处理、工具函数
├── pages/              # 页面组件
├── routes/             # 路由配置
├── store/              # Redux store 与 slices
├── test/               # Vitest 测试
├── AppRouter.tsx       # 路由挂载入口
└── main.tsx            # 应用启动入口
docs/
├── 01-architecture.md  # 当前实现与架构说明
├── 02-roadmap.md       # 后续迭代路线图
└── 03-first-batch-tasks.md # 首批开发任务拆解
```

## 推荐开发路径

### 1. 新增页面

- 在 `src/pages/` 新建页面组件
- 在 `src/routes/index.tsx` 注册路由
- 如需按页面切分代码，保持 `lazy()` 方式与现有约定一致

### 2. 接入接口

- 通用请求能力放在 `src/lib/api.ts`
- 请求生命周期扩展放在 `src/lib/apiInterceptor.ts`
- 错误分类和错误消息处理放在 `src/lib/error-handler.ts`
- 页面查询和突变优先使用 `src/lib/useApiQuery.ts`

### 3. 管理状态

- 全局客户端状态放在 Redux store
- 服务端数据放在 TanStack Query
- 局部交互状态保留在页面或组件内部

### 4. 扩展组件

- 通用 UI 组件放在 `src/components/ui/`
- 页面级组合逻辑放在页面或业务组件内
- 组件新增后，可同步补充到 `/components` 和 `/components/docs`

## 环境变量

当前代码中已使用的环境变量：

| 变量名              | 说明             |
| ------------------- | ---------------- |
| `VITE_API_BASE_URL` | API 请求基础地址 |

示例：

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

## 当前适合的使用方式

- 作为新项目的前端模板直接继续开发
- 作为团队统一基础工程的实验仓库
- 作为常见前端基础能力的参考实现

如果你要把它推进到长期维护的业务模板，建议优先阅读架构文档和 roadmap，再决定目录进一步收敛方式。

## 文档索引

- [架构说明](./docs/01-architecture.md)
- [开发路线图](./docs/02-roadmap.md)
- [第一批开发任务](./docs/03-first-batch-tasks.md)

## 现阶段说明

- 当前仓库已经具备模板化开发的基本能力
- 仍存在部分 demo 性质页面和可继续收敛的工程细节
- 后续方向是从“能力展示”继续演进到“更稳定的业务 starter”
