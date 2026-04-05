import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
  type QueryKey,
} from "@tanstack/react-query";
import { api } from "./api";
import type { ApiResponse } from "./apiInterceptor";
import type { AppError } from "./error-handler";

/**
 * Query Key 工厂
 */
export const queryKeys = {
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
  custom: (key: string, params?: Record<string, unknown>) =>
    [key, params] as const,
};

export function useApiQuery<TData = unknown>(
  url: string,
  params?: Record<string, string | number | boolean | undefined>,
  options?: {
    queryKey?: QueryKey;
    enabled?: boolean;
    staleTime?: number;
  }
) {
  return useQuery<TData, AppError>({
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

export function useApiMutation<TData = unknown, TVariables = unknown>(
  method: "post" | "put" | "patch" | "delete",
  url: string,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
  }
) {
  const queryClient = useQueryClient();

  return useMutation<TData, AppError, TVariables>({
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

export function useUserDetail(id: string) {
  return useQuery<User, AppError>({
    queryKey: queryKeys.user.detail(id),
    queryFn: async () => {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateUser() {
  return useApiMutation<User, CreateUserData>("post", "/users");
}

export function useUpdateUser() {
  return useApiMutation<User, UpdateUserData>("put", "/users");
}

export function useDeleteUser() {
  return useApiMutation<void, string>("delete", "/users");
}

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
