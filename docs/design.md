# 项目设计文档

## 1. 技术栈

### 核心框架

- **React**: 19.2.4
- **TypeScript**: ~5.9.3
- **Vite**: ^8.0.1

### UI 组件库

- **shadcn/ui**: 无头组件库，基于 Base UI
- **Tailwind CSS**: 原子化 CSS 框架

### 状态管理

- **Redux Toolkit**: 官方推荐的 Redux 工具集
  - 简化 Redux 配置
  - 内置 Immer 支持不可变更新
  - 集成 Redux DevTools

### 路由

- **react-router-dom**: v7
  - 支持嵌套路由
  - 代码分割和懒加载
  - 类型安全的路由配置

### 数据请求

- **@tanstack/react-query**:
  - 服务端状态管理
  - 自动缓存和重新验证
  - 与 Redux Toolkit 配合使用

### 图标

- **lucide-react**: 轻量级图标库
  - Tree-shakable
  - 一致的设计风格

### 国际化

- **react-i18next**:
  - 支持中文、英文、日文、韩文
  - 动态语言切换
  - 命名空间管理

## 2. 架构设计

### 2.1 目录结构

```
src/
├── components/          # 通用 UI 组件
│   ├── ui/             # shadcn/ui 组件
│   └── common/         # 业务通用组件
├── features/           # 功能模块（按业务划分）
│   ├── auth/          # 认证模块
│   ├── user/          # 用户模块
│   └── ...
├── store/             # Redux store
│   ├── index.ts       # store 配置
│   └── slices/        # Redux slices
├── hooks/             # 自定义 React Hooks
├── services/          # API 服务层
│   ├── api.ts         # fetch 实例配置
│   └── endpoints/     # API 端点
├── locales/           # 国际化文件
│   ├── zh/
│   ├── en/
│   ├── ja/
│   └── ko/
├── styles/            # 全局样式
│   ├── globals.scss   # 全局 SCSS
│   └── variables.scss # SCSS 变量
├── types/             # TypeScript 类型定义
├── utils/             # 工具函数
├── routes/            # 路由配置
└── App.tsx
```

### 2.2 样式方案

**混合使用策略：**

1. **Tailwind CSS（主要）**
   - 快速布局和间距
   - 响应式设计
   - 常用样式类
   - shadcn/ui 组件样式

2. **SCSS（辅助）**
   - 复杂动画效果
   - 全局主题变量
   - 深度嵌套样式
   - 特殊业务组件

**使用原则：**

- 优先使用 Tailwind 实现简单样式
- 复杂交互和动画使用 SCSS
- 避免内联样式
- 保持样式的可维护性

## 3. 状态管理方案

### 3.1 状态分类

1. **服务端状态**（React Query）
   - API 数据
   - 缓存管理
   - 加载状态

2. **客户端状态**（Redux Toolkit）
   - 用户信息
   - 主题设置
   - 全局 UI 状态
   - 应用配置

3. **组件状态**（useState/useReducer）
   - 表单输入
   - 临时 UI 状态
   - 局部交互状态

### 3.2 Redux Store 结构

```typescript
{
  user: {
    profile: UserProfile | null,
    preferences: UserPreferences
  },
  theme: {
    mode: 'light' | 'dark',
    primaryColor: string
  },
  ui: {
    sidebarOpen: boolean,
    notifications: Notification[]
  }
}
```

## 4. 路由设计

### 4.1 路由结构

```
/                    # 首页
/about              # 关于页面
/dashboard          # 仪表板（需要认证）
  /dashboard/profile
  /dashboard/settings
/404                # 404 页面
```

### 4.2 路由特性

- 懒加载：所有页面组件按需加载
- 路由守卫：保护需要认证的页面
- 面包屑：自动生成导航路径
- 页面过渡动画

## 5. 国际化方案

### 5.1 支持语言

- 中文（zh）- 默认
- 英文（en）
- 日文（ja）
- 韩文（ko）

### 5.2 翻译文件结构

```
locales/
├── zh/
│   ├── common.json      # 通用翻译
│   ├── auth.json        # 认证相关
│   └── errors.json      # 错误信息
├── en/
├── ja/
└── ko/
```

### 5.3 使用方式

```typescript
// 组件中使用
const { t } = useTranslation('common');
<h1>{t('welcome')}</h1>

// 动态切换语言
i18n.changeLanguage('en');
```

## 6. API 请求层设计

### 6.1 请求封装

- 统一的 fetch 实例
- 请求/响应拦截器
- 错误处理
- Token 自动注入

### 6.2 React Query 配置

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5分钟
      cacheTime: 10 * 60 * 1000, // 10分钟
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

## 7. 最佳实践

### 7.1 组件开发

- 使用函数组件和 Hooks
- 组件职责单一
- Props 类型定义完整
- 合理使用 memo 优化性能

### 7.2 代码规范

- ESLint + Prettier 统一代码风格
- 使用 TypeScript 严格模式
- 遵循 React Hooks 规则
- 组件命名使用 PascalCase

### 7.3 性能优化

- 路由懒加载
- 图片懒加载
- 虚拟列表（长列表场景）
- React.memo 避免不必要渲染
- useMemo/useCallback 优化计算

### 7.4 安全性

- XSS 防护
- CSRF Token
- 敏感信息加密
- 权限验证

## 8. 开发环境配置

### 8.1 环境变量

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=Demo App
```

### 8.2 代理配置

开发环境通过 Vite 配置代理解决跨域问题。

## 9. 构建和部署

### 9.1 构建命令

```bash
npm run build
```

### 9.2 产物

- 静态资源优化
- 代码分割
- Tree-shaking
- 压缩混淆

## 10. 测试策略

- 单元测试：Vitest
- 组件测试：React Testing Library
- E2E 测试：Playwright（可选）

---

**文档版本**: v1.0  
**最后更新**: 2026-03-31
