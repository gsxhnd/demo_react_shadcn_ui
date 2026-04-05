/**
 * 统一的错误处理工具
 */

/**
 * 错误类型
 */
export const ErrorType = {
  NETWORK: "NETWORK",
  SERVER: "SERVER",
  CLIENT: "CLIENT",
  AUTH: "AUTH",
  VALIDATION: "VALIDATION",
  UNKNOWN: "UNKNOWN",
} as const;

export type ErrorTypeValue = (typeof ErrorType)[keyof typeof ErrorType];

/**
 * 应用错误接口
 */
export interface AppError extends Error {
  type: ErrorTypeValue;
  statusCode?: number;
  details?: Record<string, unknown>;
  isRetryable: boolean;
}

/**
 * 类型守卫：检查是否是 AppError
 */
export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    "isRetryable" in error
  );
}

/**
 * 创建应用错误
 */
export function createAppError(
  message: string,
  type: ErrorTypeValue,
  options?: {
    statusCode?: number;
    details?: Record<string, unknown>;
    isRetryable?: boolean;
  }
): AppError {
  const error = new Error(message) as AppError;
  error.type = type;
  error.statusCode = options?.statusCode;
  error.details = options?.details;
  // AUTH 和 VALIDATION 错误默认可重试为 false
  const isAuthOrValidation = type === ErrorType.AUTH || type === ErrorType.VALIDATION;
  error.isRetryable = options?.isRetryable ?? !isAuthOrValidation;
  return error;
}

/**
 * 从 fetch 错误创建应用错误
 */
export function handleFetchError(error: unknown): AppError {
  // 网络错误
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return createAppError("网络连接失败，请检查网络", ErrorType.NETWORK, {
      isRetryable: true,
    });
  }

  // AbortError
  if (error instanceof DOMException && error.name === "AbortError") {
    return createAppError("请求已取消", ErrorType.CLIENT, {
      isRetryable: false,
    });
  }

  return createAppError(
    error instanceof Error ? error.message : "未知错误",
    ErrorType.UNKNOWN,
    { isRetryable: true }
  );
}

/**
 * 从 HTTP 响应创建应用错误
 */
export function handleHttpError(status: number, data?: unknown): AppError {
  switch (status) {
    case 400:
      return createAppError("请求参数错误", ErrorType.VALIDATION, {
        statusCode: status,
        details: data as Record<string, unknown>,
        isRetryable: false,
      });

    case 401:
      return createAppError("登录已过期，请重新登录", ErrorType.AUTH, {
        statusCode: status,
        isRetryable: false,
      });

    case 403:
      return createAppError("没有权限访问该资源", ErrorType.AUTH, {
        statusCode: status,
        isRetryable: false,
      });

    case 404:
      return createAppError("请求的资源不存在", ErrorType.CLIENT, {
        statusCode: status,
        isRetryable: false,
      });

    case 408:
      return createAppError("请求超时，请稍后重试", ErrorType.CLIENT, {
        statusCode: status,
        isRetryable: true,
      });

    case 500:
      return createAppError("服务器内部错误", ErrorType.SERVER, {
        statusCode: status,
        isRetryable: true,
      });

    case 502:
      return createAppError("网关错误", ErrorType.SERVER, {
        statusCode: status,
        isRetryable: true,
      });

    case 503:
      return createAppError("服务暂时不可用", ErrorType.SERVER, {
        statusCode: status,
        isRetryable: true,
      });

    case 504:
      return createAppError("网关超时", ErrorType.SERVER, {
        statusCode: status,
        isRetryable: true,
      });

    default:
      if (status >= 500) {
        return createAppError("服务器错误，请稍后重试", ErrorType.SERVER, {
          statusCode: status,
          isRetryable: true,
        });
      }
      return createAppError("请求失败", ErrorType.UNKNOWN, {
        statusCode: status,
        isRetryable: true,
      });
  }
}

/**
 * 获取错误的用户友好消息
 */
export function getErrorMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "发生未知错误";
}

/**
 * 检查是否是网络错误
 */
export function isNetworkError(error: unknown): boolean {
  if (isAppError(error)) {
    return error.type === ErrorType.NETWORK;
  }
  return error instanceof TypeError;
}

/**
 * 检查是否可以重试
 */
export function isRetryableError(error: unknown): boolean {
  if (isAppError(error)) {
    return error.isRetryable;
  }
  return true;
}

/**
 * 错误钩子回调类型
 */
export type ErrorCallback = (error: AppError) => void;

/**
 * 错误处理器管理器
 */
class ErrorHandlerManager {
  private handlers: Set<ErrorCallback> = new Set();

  subscribe(handler: ErrorCallback): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  handle(error: AppError) {
    this.handlers.forEach((handler) => {
      try {
        handler(error);
      } catch (e) {
        console.error("Error handler threw an error:", e);
      }
    });
  }

  clear() {
    this.handlers.clear();
  }
}

export const errorHandler = new ErrorHandlerManager();
