import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { LanguageTransition } from "@/components/ui/language-transition";
import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <LanguageTransition className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="flex justify-end mb-8">
          <LanguageSwitcher />
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
