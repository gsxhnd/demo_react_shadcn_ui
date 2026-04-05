import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageTransition } from "@/components/ui/language-transition";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme, toggleTheme } from "@/store/slices/themeSlice";
import { Sun, Moon, Monitor, ArrowRight, Database, Image, Layout, BookOpen, Globe, Check } from "lucide-react";
import { languages } from "@/i18n";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function HomePage() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);
  const { user } = useAppSelector((state) => state.user);

  const themeOptions = [
    { value: "light", icon: Sun, label: t("theme.light") || "浅色" },
    { value: "dark", icon: Moon, label: t("theme.dark") || "深色" },
    { value: "system", icon: Monitor, label: t("theme.system") || "系统" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <LanguageTransition className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <header className="flex justify-end mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="size-4" />
                <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px]">
              {languages.map((lang) => {
                const isSelected = i18n.language === lang.code;
                return (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={cn(
                      "flex items-center justify-between gap-4 cursor-pointer",
                      isSelected && "bg-accent/50"
                    )}
                  >
                    <span className="flex flex-col">
                      <span className="text-sm">{lang.nativeName}</span>
                      <span className="text-xs text-muted-foreground">
                        {lang.name}
                      </span>
                    </span>
                    {isSelected && (
                      <Check className="size-4 text-primary flex-shrink-0" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-50">
            {t("home.welcome")} React + shadcn/ui
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t("home.description") || "基于 Vite + TypeScript + Tailwind CSS 构建的现代化 React 应用"}
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              {t("userInfo.title") || "用户信息"}
            </h2>
            {user ? (
              <div className="space-y-2">
                <p className="text-slate-600 dark:text-slate-300">
                  {t("userInfo.name") || "用户名"}: <span className="font-medium">{user.name}</span>
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {t("userInfo.email") || "邮箱"}: <span className="font-medium">{user.email}</span>
                </p>
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">{t("userInfo.notLoggedIn") || "未登录"}</p>
            )}
          </section>

          <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              {t("theme.title") || "主题设置"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              {t("theme.current") || "当前主题"}: <span className="font-medium capitalize">{theme}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {themeOptions.map(({ value, icon: Icon, label }) => (
                <Button
                  key={value}
                  variant={theme === value ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    dispatch(setTheme(value as "light" | "dark" | "system"))
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              ))}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => dispatch(toggleTheme())}
              >
                {t("theme.switch") || "切换主题"}
              </Button>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              v1.0.0 新功能
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              正式版本 - 核心功能完善
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  完善的错误处理机制
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  优化的 API 封装
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  加载状态处理
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  主题切换（亮色/暗色）
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  性能优化（代码分割、懒加载）
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  单元测试
                </span>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              v0.5.0 新功能
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              UI 组件库完善
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Layout className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  shadcn/ui 组件示例
                </span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  完整的组件文档
                </span>
              </div>
              <Link to="/components">
                <Button className="w-full mt-2">
                  查看组件示例
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/components/docs">
                <Button variant="outline" className="w-full mt-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  查看文档
                </Button>
              </Link>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              v0.4.0 功能
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              {t("home.i18nFeatures") || "国际化支持（中英日韩）"}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {t("home.reactQuery") || "React Query 数据请求"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Image className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {t("home.lucideIcons") || "Lucide React 图标库"}
                </span>
              </div>
              <Link to="/api-demo">
                <Button className="w-full mt-2">
                  {t("home.viewDemo") || "查看演示"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>
        </div>

        <footer className="text-center mt-16 text-slate-500 dark:text-slate-400">
          <p>
            React v{typeof window !== "undefined" ? "19" : "19"} + Vite +
            TypeScript
          </p>
        </footer>
      </div>
    </LanguageTransition>
  );
}

export default HomePage;
