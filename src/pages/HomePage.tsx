import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { PageSection, PageGrid } from "@/layout";
import {
  ArrowRight,
  Database,
  Layout,
  BookOpen,
  Zap,
  Shield,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  className,
}: FeatureCardProps) {
  const content = (
    <div
      className={cn(
        "bg-white dark:bg-slate-800 rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow",
        href && "cursor-pointer",
        className,
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }
  return content;
}

function HomePage() {
  const capabilities = [
    {
      icon: Shield,
      title: "错误处理",
      description: "完善的 ErrorBoundary 机制，优雅处理组件崩溃",
    },
    {
      icon: Layers,
      title: "API 封装",
      description: "统一的请求封装，支持请求拦截与错误处理",
    },
    {
      icon: Zap,
      title: "性能优化",
      description: "代码分割、懒加载，减少首屏加载时间",
    },
  ];

  const uiCapabilities = [
    {
      icon: Layout,
      title: "组件示例",
      description: "丰富的 shadcn/ui 组件演示",
      href: "/components",
    },
    {
      icon: BookOpen,
      title: "组件文档",
      description: "详细的组件 API 文档与使用说明",
      href: "/components/docs",
    },
    {
      icon: Database,
      title: "API 接入",
      description: "数据层能力与 hooks 使用指南",
      href: "/api-demo",
    },
  ];

  const techStack = [
    { name: "React", version: "19" },
    { name: "Vite", version: "5.x" },
    { name: "TypeScript", version: "5.x" },
    { name: "Tailwind CSS", version: "3.x" },
    { name: "shadcn/ui", version: "latest" },
    { name: "React Query", version: "5.x" },
    { name: "i18next", version: "23.x" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-50">
            React + shadcn/ui 项目模板
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            基于 Vite + TypeScript + Tailwind CSS 构建的现代化 React 应用模板，
            集成 shadcn/ui 组件库、React Query 数据层和国际化支持
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/components">
              <Button size="lg" className="gap-2">
                查看组件示例
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/components/docs">
              <Button size="lg" variant="outline" className="gap-2">
                <BookOpen className="w-4 h-4" />
                查看文档
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <PageSection title="工程能力" description="开箱即用的工程基础设施">
        <PageGrid cols={3}>
          {capabilities.map((item) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </PageGrid>
      </PageSection>

      {/* UI Entry Section */}
      <PageSection
        title="页面入口"
        description="快速访问组件示例、文档和 API 说明"
        className="bg-slate-50 dark:bg-slate-800/50"
      >
        <PageGrid cols={3}>
          {uiCapabilities.map((item) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              href={item.href}
            />
          ))}
        </PageGrid>
      </PageSection>

      {/* Tech Stack Section */}
      <PageSection title="技术栈">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="bg-white dark:bg-slate-800 rounded-lg border p-3 text-center"
            >
              <span className="font-medium text-sm text-slate-900 dark:text-slate-100">
                {tech.name}
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                v{tech.version}
              </span>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Quick Start Section */}
      <PageSection
        title="快速开始"
        description="从模板出发进行二次开发"
        className="bg-slate-50 dark:bg-slate-800/50"
      >
        <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 font-mono text-sm">
          <div className="text-slate-400 mb-2"># 克隆项目</div>
          <div className="text-green-400 mb-4">git clone &lt;repo-url&gt;</div>
          <div className="text-slate-400 mb-2"># 安装依赖</div>
          <div className="text-green-400 mb-4">pnpm install</div>
          <div className="text-slate-400 mb-2"># 启动开发服务器</div>
          <div className="text-green-400">pnpm dev</div>
        </div>
      </PageSection>

      {/* Footer */}
      <footer className="border-t py-8 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>React v19 + Vite + TypeScript + Tailwind CSS + shadcn/ui</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
