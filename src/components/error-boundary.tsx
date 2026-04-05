import { Component, type ReactNode, type ErrorInfo } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <DefaultErrorFallback
          error={this.state.error}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

interface DefaultErrorFallbackProps {
  error: Error | null;
  onRetry: () => void;
}

function DefaultErrorFallback({ error, onRetry }: DefaultErrorFallbackProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[400px] p-8",
        "bg-destructive/5 border border-destructive/20 rounded-lg",
        "text-center",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-16 h-16 rounded-full",
          "bg-destructive/10 mb-6",
        )}
      >
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>

      <h2 className="text-xl font-semibold text-foreground mb-2">
        {t("error.title", "出错了")}
      </h2>

      <p className="text-muted-foreground mb-4 max-w-md">
        {t(
          "error.description",
          "应用程序遇到了一些问题，请尝试刷新页面或返回首页。",
        )}
      </p>

      {error && (
        <div
          className={cn(
            "p-4 rounded-lg bg-muted/50 text-left",
            "font-mono text-xs text-muted-foreground",
            "max-w-full overflow-auto mb-4",
            "border border-border",
          )}
        >
          <p className="font-semibold mb-1">{error.name}</p>
          <p className="whitespace-pre-wrap break-all">{error.message}</p>
        </div>
      )}

      <div className="flex gap-3">
        <Button onClick={onRetry} variant="default">
          <RefreshCw className="w-4 h-4 mr-2" />
          {t("error.retry", "重试")}
        </Button>
        <Button onClick={() => (window.location.href = "/")} variant="outline">
          {t("error.goHome", "返回首页")}
        </Button>
      </div>
    </div>
  );
}

export default ErrorBoundary;
