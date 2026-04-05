import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHero({ title, description, children, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 md:py-16",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-slate-50">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
