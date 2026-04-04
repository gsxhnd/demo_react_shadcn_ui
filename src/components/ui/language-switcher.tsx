import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { languages } from "@/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLanguageChange = (langCode: string) => {
    setIsAnimating(true);
    i18n.changeLanguage(langCode);
    setTimeout(() => {
      setIsAnimating(false);
      setIsOpen(false);
    }, 300);
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "gap-2 transition-all duration-300",
          isAnimating && "opacity-50 pointer-events-none"
        )}
      >
        <Globe className="size-4" />
        <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
      </Button>

      <div
        className={cn(
          "absolute right-0 top-full mt-2 z-50 min-w-[140px] rounded-lg border bg-background shadow-lg overflow-hidden transition-all duration-300 origin-top-right",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                "w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-muted transition-colors duration-200",
                i18n.language === lang.code && "bg-muted/50"
              )}
            >
              <span className="flex items-center gap-2">
                <span>{lang.nativeName}</span>
                <span className="text-muted-foreground text-xs">
                  {lang.name}
                </span>
              </span>
              {i18n.language === lang.code && (
                <Check className="size-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export { LanguageSwitcher };
