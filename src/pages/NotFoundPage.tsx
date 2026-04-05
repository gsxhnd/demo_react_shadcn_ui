import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageTransition } from "@/components/ui/language-transition";
import { useNavigate } from "react-router";
import { Home, ArrowLeft, Globe, Check } from "lucide-react";
import { languages } from "@/i18n";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <LanguageTransition className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="flex justify-end mb-8">
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
        </div>

        <div className="mb-8">
          <h1 className="text-9xl font-bold text-slate-200 dark:text-slate-700">404</h1>
        </div>
        <h2 className="text-3xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
          {t("notFound.title")}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          {t("notFound.description")}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("notFound.backPrev") || "返回上一页"}
          </Button>
          <Button onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            {t("notFound.backHome")}
          </Button>
        </div>
      </div>
    </LanguageTransition>
  );
}

export default NotFoundPage;
