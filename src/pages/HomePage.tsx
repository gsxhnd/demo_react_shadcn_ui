import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "@/store";
import { setTheme, toggleTheme } from "@/store/slices/themeSlice";
import { Sun, Moon, Monitor } from "lucide-react";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useSelector((state: RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.user);

  const themeOptions = [
    { value: "light", icon: Sun, label: "浅色" },
    { value: "dark", icon: Moon, label: "深色" },
    { value: "system", icon: Monitor, label: "系统" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-50">
            欢迎使用 React + shadcn/ui
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            基于 Vite + TypeScript + Tailwind CSS 构建的现代化 React 应用
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              用户信息
            </h2>
            {user ? (
              <div className="space-y-2">
                <p className="text-slate-600 dark:text-slate-300">
                  用户名: <span className="font-medium">{user.name}</span>
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  邮箱: <span className="font-medium">{user.email}</span>
                </p>
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">未登录</p>
            )}
          </section>

          <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              主题设置
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              当前主题: <span className="font-medium capitalize">{theme}</span>
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
                切换主题
              </Button>
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
    </div>
  );
}

export default HomePage;
