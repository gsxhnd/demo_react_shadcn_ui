/**
 * API 请求封装
 */
import type { RequestConfig, ApiResponse } from "./apiInterceptor";
import { requestInterceptorManager, responseInterceptorManager, cancelRequest } from "./apiInterceptor";
import { ErrorType, handleFetchError, createAppError, isAppError } from "./error-handler";
import type { AppError } from "./error-handler";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
  try {
    const finalConfig = await requestInterceptorManager.execute(config);

    let url = `${API_BASE_URL}${finalConfig.url}`;
    if (finalConfig.params) {
      const searchParams = new URLSearchParams();
      Object.entries(finalConfig.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const options: RequestInit = {
      method: finalConfig.method || "GET",
      headers: finalConfig.headers,
    };

    if (finalConfig.data && !["GET", "HEAD"].includes(options.method || "")) {
      options.body = JSON.stringify(finalConfig.data);
    }

    if (finalConfig.signal) {
      options.signal = finalConfig.signal;
    }

    const response = await fetch(url, options);

    let data: T;
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text as unknown as T;
    }

    const apiResponse: ApiResponse<T> = {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    };

    if (!response.ok) {
      const appError = createAppError(
        (data as { message?: string })?.message || response.statusText,
        ErrorType.UNKNOWN,
        { statusCode: response.status }
      );
      const handledError = responseInterceptorManager.executeError(appError);
      throw handledError;
    }

    const result = responseInterceptorManager.execute(apiResponse);
    return result as ApiResponse<T>;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      const abortError = createAppError("请求已取消", ErrorType.CLIENT, { isRetryable: false });
      throw abortError;
    }

    if (isAppError(err)) {
      handleError(err);
      throw err;
    }

    const appError = handleFetchError(err);
    handleError(appError);
    throw appError;
  } finally {
    if (config.requestId) {
      cancelRequest(config.requestId);
    }
  }
}

const errorHandlers: Set<(error: AppError) => void> = new Set();

export function onError(handler: (error: AppError) => void): () => void {
  errorHandlers.add(handler);
  return () => errorHandlers.delete(handler);
}

function handleError(error: AppError) {
  errorHandlers.forEach((handler) => {
    try {
      handler(error);
    } catch {
      console.error("Error handler threw");
    }
  });
}

export const api = {
  get<T>(url: string, params?: Record<string, string | number | boolean | undefined | null>, config?: Partial<RequestConfig>) {
    return request<T>({ url, method: "GET", params, ...config });
  },
  post<T>(url: string, data?: unknown, config?: Partial<RequestConfig>) {
    return request<T>({ url, method: "POST", data, ...config });
  },
  put<T>(url: string, data?: unknown, config?: Partial<RequestConfig>) {
    return request<T>({ url, method: "PUT", data, ...config });
  },
  patch<T>(url: string, data?: unknown, config?: Partial<RequestConfig>) {
    return request<T>({ url, method: "PATCH", data, ...config });
  },
  delete<T>(url: string, params?: Record<string, string | number | boolean | undefined | null>, config?: Partial<RequestConfig>) {
    return request<T>({ url, method: "DELETE", params, ...config });
  },
  request,
};

export type { RequestConfig, ApiResponse };

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function createPaginationParams(page = 1, pageSize = 10): PaginationParams {
  return { page, pageSize };
}

export function parsePaginatedResponse<T>(response: ApiResponse<PaginatedResponse<T>>): PaginatedResponse<T> {
  return response.data;
}
