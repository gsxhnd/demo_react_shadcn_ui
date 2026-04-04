import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
  type QueryKey,
} from "@tanstack/react-query";
import { api, type ApiError, type ApiResponse } from "./api";

/**
 * Query Key 工厂 - 统一管理 query keys
 */
export const queryKeys = {
  // 示例：根据功能模块划分
  user: {
    all: ["user"] as const,
    detail: (id: string) => ["user", "detail", id] as const,
    list: (params?: Record<string, unknown>) =>
      ["user", "list", params] as const,
  },
  post: {
    all: ["post"] as const,
    detail: (id: string) => ["post", "detail", id] as const,
    list: (params?: Record<string, unknown>) =>
      ["post", "list", params] as const,
  },
  // 通用
  custom: (key: string, params?: Record<string, unknown>) =>
    [key, params] as const,
};

/**
 * useQuery 封装
 * 直接返回 response.data 而不是整个 ApiResponse
 */
export function useApiQuery<TData = unknown>(
  url: string,
  params?: Record<string, string | number | boolean | undefined>,
  options?: {
    queryKey?: QueryKey;
    enabled?: boolean;
    staleTime?: number;
  }
) {
  return useQuery<TData, ApiError>({
    queryKey: options?.queryKey || ["api", url, params],
    queryFn: async () => {
      const response = await api.get<TData>(url, params);
      return response.data;
    },
    enabled: options?.enabled,
    staleTime: options?.staleTime,
    placeholderData: keepPreviousData,
  });
}

/**
 * useMutation 封装
 */
export function useApiMutation<TData = unknown, TVariables = unknown>(
  method: "post" | "put" | "patch" | "delete",
  url: string,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
  }
) {
  const queryClient = useQueryClient();

  return useMutation<TData, ApiError, TVariables>({
    mutationFn: async (data) => {
      let response: ApiResponse<TData>;
      if (method === "delete") {
        response = await api.delete<TData>(url, data as Record<string, string | number | boolean | undefined>);
      } else {
        response = await api[method]<TData>(url, data);
      }
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries();
      options?.onSuccess?.(data, variables);
    },
  });
}

/**
 * 预定义查询钩子示例
 */

// 用户列表查询
export function useUserList(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: queryKeys.user.list(params),
    queryFn: async () => {
      const response = await api.get<{ list: User[]; total: number }>("/users", params);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
}

// 用户详情查询
export function useUserDetail(id: string) {
  return useQuery<User, ApiError>({
    queryKey: queryKeys.user.detail(id),
    queryFn: async () => {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

// 创建用户
export function useCreateUser() {
  return useApiMutation<User, CreateUserData>("post", "/users");
}

// 更新用户
export function useUpdateUser() {
  return useApiMutation<User, UpdateUserData>("put", "/users");
}

// 删除用户
export function useDeleteUser() {
  return useApiMutation<void, string>("delete", "/users");
}

// 类型定义
interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserData {
  name: string;
  email: string;
  password?: string;
}

interface UpdateUserData {
  id: string;
  name?: string;
  email?: string;
}
