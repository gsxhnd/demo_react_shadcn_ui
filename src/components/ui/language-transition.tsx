import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface LanguageTransitionProps {
  children: ReactNode;
  className?: string;
}

function LanguageTransition({ children, className }: LanguageTransitionProps) {
  const { i18n } = useTranslation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [i18n.language]);

  return (
    <div
      className={cn(
        "transition-all duration-150",
        isTransitioning && "opacity-0 translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export { LanguageTransition };
