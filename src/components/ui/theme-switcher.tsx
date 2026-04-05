import { useDispatch } from "react-redux";
import { Sun, Moon, Monitor } from "lucide-react";
import type { AppDispatch } from "@/store";
import {
  setTheme,
  toggleTheme,
  type ThemeMode,
} from "@/store/slices/themeSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const themeIcons: Record<ThemeMode, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const themeLabels: Record<ThemeMode, string> = {
  light: "浅色模式",
  dark: "深色模式",
  system: "跟随系统",
};

export function ThemeSwitcher() {
  const dispatch = useDispatch<AppDispatch>();

  const handleThemeChange = (theme: ThemeMode) => {
    dispatch(setTheme(theme));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="sm" className="gap-2">
          主题
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {(Object.keys(themeLabels) as ThemeMode[]).map((theme) => {
          const Icon = themeIcons[theme];
          return (
            <DropdownMenuItem
              key={theme}
              onClick={() => handleThemeChange(theme)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{themeLabels[theme]}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ThemeToggle() {
  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative"
      aria-label="切换主题"
    >
      <Sun className="w-5 h-5 transition-all duration-300 dark:rotate-90 dark:scale-0" />
      <Moon className="absolute w-5 h-5 transition-all duration-300 -rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

export function getThemeIcon(theme: ThemeMode) {
  return themeIcons[theme];
}

export function getThemeLabel(theme: ThemeMode) {
  return themeLabels[theme] || theme;
}
