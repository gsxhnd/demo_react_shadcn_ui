import { useEffect, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">加载中...</p>
      </div>
    </div>
  );
}

export type LoadingState = "idle" | "loading" | "success" | "error";

export function useLoadingState(initialState: LoadingState = "idle") {
  const [state, setState] = useState<LoadingState>(initialState);
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<Error | null>(null);

  const startLoading = useCallback((msg?: string) => {
    setState("loading");
    setMessage(msg);
    setError(null);
  }, []);

  const setSuccess = useCallback((msg?: string) => {
    setState("success");
    setMessage(msg);
    setError(null);
  }, []);

  const setErrorState = useCallback((err: Error | string, msg?: string) => {
    setState("error");
    setError(err instanceof Error ? err : new Error(err));
    setMessage(msg);
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
    setMessage(undefined);
    setError(null);
  }, [initialState]);

  return {
    state,
    message,
    error,
    isLoading: state === "loading",
    isError: state === "error",
    isSuccess: state === "success",
    isIdle: state === "idle",
    startLoading,
    setSuccess,
    setError: setErrorState,
    reset,
  };
}

export function useDelayedLoading(isLoading: boolean, delay = 300) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isLoading) {
      timeout = setTimeout(() => setShowLoader(true), delay);
    } else {
      setShowLoader(false);
    }
    return () => { if (timeout) clearTimeout(timeout); };
  }, [isLoading, delay]);

  return showLoader;
}

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function LoadingButton({ isLoading = false, loadingText, children, disabled, className, ...props }: LoadingButtonProps) {
  return (
    <button
      className={cn("relative inline-flex items-center justify-center", "disabled:opacity-50 disabled:cursor-not-allowed", className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className={cn("absolute w-4 h-4 animate-spin", children ? "mr-2" : "")} />}
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = "rounded", width, height }: SkeletonProps) {
  const variantClass = {
    text: "h-4 w-full",
    circular: "rounded-full aspect-square",
    rectangular: "rounded-none",
    rounded: "rounded-md",
  }[variant];

  return (
    <div className={cn("animate-pulse bg-muted", variantClass, className)} style={{ width, height }} />
  );
}

export function SkeletonList({ count = 3, height = 60 }: { count?: number; height?: string | number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} height={height} className="w-full" />
      ))}
    </div>
  );
}
