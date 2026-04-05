import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-switcher";
import { languages } from "@/i18n";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: "/", label: "首页" },
  { path: "/components", label: "组件示例" },
  { path: "/components/docs", label: "组件文档" },
  { path: "/api-demo", label: "API 接入" },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="size-4" />
          <span className="hidden sm:inline">
            {currentLanguage?.nativeName}
          </span>
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
                isSelected && "bg-accent/50",
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
  );
}

interface SiteHeaderProps {
  showNav?: boolean;
}

export function SiteHeader({ showNav = true }: SiteHeaderProps) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                R
              </span>
            </div>
            <span className="font-semibold text-lg hidden sm:inline">
              React 模板
            </span>
          </Link>

          {showNav && (
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== "/" &&
                    location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

interface AppShellProps {
  children: ReactNode;
  showNav?: boolean;
  showHeader?: boolean;
  className?: string;
}

export function AppShell({
  children,
  showNav = true,
  showHeader = true,
  className,
}: AppShellProps) {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      {showHeader && <SiteHeader showNav={showNav} />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
