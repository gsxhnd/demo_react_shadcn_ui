import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageTransition } from "@/components/ui/language-transition";
import { Globe, Check } from "lucide-react";
import { languages } from "@/i18n";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const { t, i18n } = useTranslation();
  const [count, setCount] = useState(0);

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <LanguageTransition className="w-full">
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>{t("home.title")}</h1>
          <p>{t("home.description")}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setCount((count) => count + 1)}
          >
            {t("home.countButton", { count })}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="size-4" />
                <span>{currentLanguage?.nativeName}</span>
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
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
    </LanguageTransition>
  );
}

export default App;
