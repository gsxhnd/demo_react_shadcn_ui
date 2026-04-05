import { Suspense, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 路由懒加载加载状态的 props
 */
export interface RouteLoaderProps {
  routePath?: string;
}

/**
 * 默认的路由加载组件
 */
export function DefaultRouteLoader({ routePath }: RouteLoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-[400px]",
        "bg-background/50 backdrop-blur-sm"
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          加载中{routePath ? ` ${routePath}` : ""}...
        </p>
      </div>
    </div>
  );
}

/**
 * 路由懒加载加载状态组件的工厂函数
 */
export function createRouteLoader(
  LoadingComponent?: React.ComponentType<RouteLoaderProps>
) {
  const Loader = LoadingComponent || DefaultRouteLoader;

  return function RouteSuspense({
    children,
    routePath,
    fallback,
  }: {
    children: ReactNode;
    routePath?: string;
    fallback?: ReactNode;
  }) {
    return (
      <Suspense fallback={fallback || <Loader routePath={routePath} />}>
        {children}
      </Suspense>
    );
  };
}

/**
 * 全屏路由 Suspense 边界
 */
export function FullPageRouteSuspense({
  children,
  routePath,
}: {
  children: ReactNode;
  routePath?: string;
}) {
  return (
    <Suspense
      fallback={
        <div
          className={cn(
            "fixed inset-0 z-50",
            "flex items-center justify-center",
            "bg-background"
          )}
        >
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              加载中{routePath ? ` ${routePath}` : ""}...
            </p>
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

/**
 * 内联路由 Suspense 边界
 */
export function InlineRouteSuspense({
  children,
  className,
  minHeight = 200,
}: {
  children: ReactNode;
  className?: string;
  minHeight?: number | string;
}) {
  return (
    <Suspense
      fallback={
        <div
          className={cn("flex items-center justify-center bg-muted/20 rounded-lg", className)}
          style={{ minHeight }}
        >
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

/**
 * 内容占位符（初始加载前显示）
 */
export function ContentPlaceholder({
  isLoading,
  children,
  skeleton,
}: {
  isLoading: boolean;
  children: ReactNode;
  skeleton?: ReactNode;
}) {
  if (isLoading) {
    return skeleton || <DefaultRouteLoader />;
  }

  return <>{children}</>;
}
