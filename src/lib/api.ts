import type {
  RequestConfig,
  ApiResponse,
  ApiError,
} from "./apiInterceptor";
import { requestInterceptorManager } from "./apiInterceptor";

/**
 * API 基础配置
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/**
 * 错误处理函数
 */
function createApiError(error: unknown, status?: number, statusText?: string): ApiError {
  const err = new Error(
    error instanceof Error ? error.message : "请求失败"
  ) as ApiError;
  err.status = status;
  err.statusText = statusText;
  if (error instanceof Error && error.stack) {
    err.stack = error.stack;
  }
  return err;
}

/**
 * 核心请求函数
 */
async function request<T = unknown>(
  config: RequestConfig
): Promise<ApiResponse<T>> {
  try {
    // 应用请求拦截器
    const finalConfig = await requestInterceptorManager.execute(config);

    // 构建 URL
    let url = `${API_BASE_URL}${finalConfig.url}`;
    if (finalConfig.params) {
      const searchParams = new URLSearchParams();
      Object.entries(finalConfig.params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    // 构建请求选项
    const options: RequestInit = {
      method: finalConfig.method || "GET",
      headers: finalConfig.headers,
    };

    // 添加请求体
    if (finalConfig.data && !["GET", "HEAD"].includes(options.method || "")) {
      options.body = JSON.stringify(finalConfig.data);
    }

    // 发起请求
    const response = await fetch(url, options);

    // 解析响应
    let data: T;
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = (await response.text()) as unknown as T;
    }

    // 构建响应对象
    const apiResponse: ApiResponse<T> = {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    };

    // 检查响应状态
    if (!response.ok) {
      const error = createApiError(
        apiResponse.data || response.statusText,
        response.status,
        response.statusText
      );
      throw error;
    }

    return apiResponse;
  } catch (err) {
    if (err instanceof Error) {
      const apiError = err as ApiError;
      // 错误处理逻辑
      if (apiError.status === 401) {
        console.warn("未授权，请重新登录");
      } else if (apiError.status === 403) {
        console.warn("没有权限访问该资源");
      } else if (apiError.status && apiError.status >= 500) {
        console.error("服务器错误，请稍后重试");
      }
    }
    throw err;
  }
}

/**
 * HTTP 方法封装
 */
export const api = {
  /**
   * GET 请求
   */
  get: <T = unknown>(
    url: string,
    params?: Record<string, string | number | boolean | undefined>
  ) =>
    request<T>({
      url,
      method: "GET",
      params,
    }),

  /**
   * POST 请求
   */
  post: <T = unknown>(url: string, data?: unknown) =>
    request<T>({
      url,
      method: "POST",
      data,
    }),

  /**
   * PUT 请求
   */
  put: <T = unknown>(url: string, data?: unknown) =>
    request<T>({
      url,
      method: "PUT",
      data,
    }),

  /**
   * PATCH 请求
   */
  patch: <T = unknown>(url: string, data?: unknown) =>
    request<T>({
      url,
      method: "PATCH",
      data,
    }),

  /**
   * DELETE 请求
   */
  delete: <T = unknown>(url: string, params?: Record<string, string | number | boolean | undefined>) =>
    request<T>({
      url,
      method: "DELETE",
      params,
    }),

  /**
   * 原始请求方法
   */
  request,
};

/**
 * 导出类型
 */
export type { RequestConfig, ApiResponse, ApiError };

/**
 * 常用 API 响应类型定义
 */
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
