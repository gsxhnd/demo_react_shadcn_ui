/**
 * 请求拦截器类型定义
 */
export interface RequestInterceptor {
  onFulfilled?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  onRejected?: (error: unknown) => unknown;
}

/**
 * 响应拦截器类型定义
 */
export interface ResponseInterceptor<T = unknown> {
  onFulfilled?: (response: ApiResponse<T>) => ApiResponse<T>;
  onRejected?: (error: ApiError) => ApiError;
}

/**
 * 请求配置接口
 */
export interface RequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  data?: unknown;
  timeout?: number;
}

/**
 * API 响应接口
 */
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * API 错误接口
 */
export interface ApiError extends Error {
  status?: number;
  statusText?: string;
  response?: {
    data?: unknown;
  };
}

/**
 * 请求拦截器管理器
 */
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
    let result = config;
    for (const interceptor of this.interceptors) {
      if (interceptor.onFulfilled) {
        result = await interceptor.onFulfilled(result);
      }
    }
    return result;
  }
}

/**
 * 响应拦截器管理器
 */
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

  async execute(response: ApiResponse<T>): Promise<ApiResponse<T>> {
    let result = response;
    for (const interceptor of this.interceptors) {
      if (interceptor.onFulfilled) {
        result = interceptor.onFulfilled(result);
      }
    }
    return result;
  }

  async executeError(error: ApiError): Promise<never> {
    let result: ApiError = error;
    for (const interceptor of this.interceptors) {
      if (interceptor.onRejected) {
        const output = interceptor.onRejected(result);
        if (output) {
          result = output as ApiError;
        }
      }
    }
    throw result;
  }
}

/**
 * 全局请求拦截器管理器
 */
export const requestInterceptorManager = new RequestInterceptorManager();

/**
 * 全局响应拦截器管理器
 */
export const responseInterceptorManager = new ResponseInterceptorManager();

/**
 * 添加默认请求拦截器
 */
requestInterceptorManager.use({
  onFulfilled: (config) => {
    // 添加默认 Content-Type
    const headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };

    // 添加时间戳防止缓存（GET 请求）
    if (config.method === "GET" || !config.method) {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return {
      ...config,
      headers,
    };
  },
});

/**
 * 添加默认响应拦截器
 */
responseInterceptorManager.use({
  onRejected: (error) => {
    // 错误处理逻辑
    if (error.status === 401) {
      // 处理未授权
      console.warn("未授权，请重新登录");
      // 可以触发登出或重定向到登录页
    } else if (error.status === 403) {
      console.warn("没有权限访问该资源");
    } else if (error.status && error.status >= 500) {
      console.error("服务器错误，请稍后重试");
    }
    return error;
  },
});

export { RequestInterceptorManager, ResponseInterceptorManager };
