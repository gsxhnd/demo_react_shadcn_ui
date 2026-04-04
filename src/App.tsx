import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { LanguageTransition } from "@/components/ui/language-transition";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

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
          <LanguageSwitcher />
        </div>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
    </LanguageTransition>
  );
}

export default App;
