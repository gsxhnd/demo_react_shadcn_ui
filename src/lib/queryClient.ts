import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * staleTime: 数据被认为"过时"之前的时间（毫秒）
       * 设置为 5 分钟，减少不必要的请求
       */
      staleTime: 5 * 60 * 1000,
      /**
       * gcTime: 未使用的数据在缓存中保留的时间（毫秒）
       * 设置为 10 分钟
       */
      gcTime: 10 * 60 * 1000,
      /**
       * retry: 请求失败时的重试次数
       * 设置为 3 次，使用指数退避
       */
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      /**
       * refetchOnWindowFocus: 窗口聚焦时是否重新获取数据
       */
      refetchOnWindowFocus: false,
      /**
       * refetchOnReconnect: 重新连接网络时是否重新获取数据
       */
      refetchOnReconnect: true,
    },
    mutations: {
      /**
       * retry: 突变操作的重试次数
       * 默認為 0，因为突变通常不应该重试
       */
      retry: 0,
    },
  },
});
