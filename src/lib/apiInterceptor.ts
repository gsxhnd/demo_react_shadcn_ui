/**
 * API 拦截器系统
 */
import type { AppError } from "./error-handler";
import { ErrorType, handleHttpError } from "./error-handler";

const abortControllers = new Map<string, AbortController>();

export interface RequestInterceptor {
  onFulfilled?: (
    config: RequestConfig,
  ) => RequestConfig | Promise<RequestConfig>;
  onRejected?: (error: unknown) => unknown;
}

export interface ResponseInterceptor<T = unknown> {
  onFulfilled?: (response: ApiResponse<T>) => ApiResponse<T>;
  onRejected?: (error: AppError) => AppError;
}

export interface RequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined | null>;
  data?: unknown;
  timeout?: number;
  signal?: AbortSignal;
  requestId?: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

class RequestInterceptorManager {
  private interceptors: RequestInterceptor[] = [];

  use(interceptor: RequestInterceptor): () => void {
    this.interceptors.push(interceptor);
    return () => {
      const index = this.interceptors.indexOf(interceptor);
      if (index > -1) {
        this.interceptors.splice(index, 1);
      }
    };
  }

  async execute(config: RequestConfig): Promise<RequestConfig> {
    let result: RequestConfig = config;
    for (const interceptor of this.interceptors) {
      if (interceptor.onFulfilled) {
        try {
          result = (await interceptor.onFulfilled(result)) as RequestConfig;
        } catch (error) {
          if (interceptor.onRejected) {
            result = interceptor.onRejected(error) as unknown as RequestConfig;
          } else {
            throw error;
          }
        }
      }
    }
    return result;
  }
}

class ResponseInterceptorManager<T = unknown> {
  private interceptors: ResponseInterceptor<T>[] = [];

  use(interceptor: ResponseInterceptor<T>): () => void {
    this.interceptors.push(interceptor);
    return () => {
      const index = this.interceptors.indexOf(interceptor);
      if (index > -1) {
        this.interceptors.splice(index, 1);
      }
    };
  }

  execute(response: ApiResponse<T>): ApiResponse<T> {
    let result = response;
    for (const interceptor of this.interceptors) {
      if (interceptor.onFulfilled) {
        result = interceptor.onFulfilled(result);
      }
    }
    return result;
  }

  executeError(error: AppError): AppError {
    let result: AppError = error;
    for (const interceptor of this.interceptors) {
      if (interceptor.onRejected) {
        try {
          result = interceptor.onRejected(result);
        } catch {
          // 保持原错误
        }
      }
    }
    return result;
  }
}

export const requestInterceptorManager = new RequestInterceptorManager();
export const responseInterceptorManager = new ResponseInterceptorManager();

export function getAbortController(requestId: string): AbortController {
  const existing = abortControllers.get(requestId);
  if (existing) {
    existing.abort();
  }
  const controller = new AbortController();
  abortControllers.set(requestId, controller);
  return controller;
}

export function cancelRequest(requestId: string) {
  const controller = abortControllers.get(requestId);
  if (controller) {
    controller.abort();
    abortControllers.delete(requestId);
  }
}

export function cancelAllRequests() {
  abortControllers.forEach((controller) => {
    controller.abort();
  });
  abortControllers.clear();
}

function createTimeoutSignal(timeout?: number): AbortSignal | undefined {
  if (!timeout) return undefined;
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return controller.signal;
}

requestInterceptorManager.use({
  onFulfilled: (config) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...config.headers,
    };

    if (config.method === "GET" || !config.method) {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    if (!config.requestId) {
      config.requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    const timeoutSignal = createTimeoutSignal(config.timeout);
    if (timeoutSignal && !config.signal) {
      config.signal = timeoutSignal;
    }

    return {
      ...config,
      headers,
    };
  },
});

responseInterceptorManager.use({
  onRejected: (error) => {
    if (error.statusCode) {
      return handleHttpError(error.statusCode);
    }
    if (error.type === ErrorType.NETWORK) {
      return error;
    }
    return error;
  },
});

export { RequestInterceptorManager, ResponseInterceptorManager };
