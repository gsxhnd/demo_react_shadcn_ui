import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageSectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
}

export function PageSection({
  children,
  title,
  description,
  className,
  containerClassName,
}: PageSectionProps) {
  return (
    <section className={cn("py-8 md:py-12", className)}>
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h2 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-slate-50">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-slate-600 dark:text-slate-400">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

interface PageGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

export function PageGrid({ children, cols = 3, className }: PageGridProps) {
  const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", colsMap[cols], className)}>
      {children}
    </div>
  );
}
