/**
 * API 调用的 hooks 示例
 *
 * 这个文件展示了如何在组件中使用封装好的 API hooks
 */

import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { api } from "@/lib/api";

// ============================================
// 示例 1: 基础 GET 请求
// ============================================

/**
 * 获取文章列表
 */
async function fetchPosts(page = 1, pageSize = 10) {
  const response = await api.get<{
    list: Post[];
    total: number;
  }>("/posts", { page, pageSize });
  return response.data;
}

/**
 * 文章列表 Hook - 基础用法
 */
export function usePosts(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ["posts", { page, pageSize }],
    queryFn: () => fetchPosts(page, pageSize),
    // 切换页码时保持旧数据不闪烁
    placeholderData: keepPreviousData,
  });
}

// ============================================
// 示例 2: 带搜索的查询
// ============================================

/**
 * 搜索用户
 */
async function searchUsers(query: string) {
  const response = await api.get<{ users: User[] }>("/users/search", {
    q: query,
  });
  return response.data;
}

/**
 * 用户搜索 Hook - 带防抖
 */
export function useUserSearch(query: string, debounceMs = 300) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // 简单的防抖实现
  useState(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);
    return () => clearTimeout(timer);
  });

  return useQuery({
    queryKey: ["users", "search", debouncedQuery],
    queryFn: () => searchUsers(debouncedQuery),
    // 搜索词为空时不请求
    enabled: debouncedQuery.length > 0,
  });
}

// ============================================
// 示例 3: POST 突变
// ============================================

/**
 * 创建文章
 */
async function createPost(data: CreatePostData) {
  const response = await api.post<Post>("/posts", data);
  return response.data;
}

interface CreatePostData {
  title: string;
  content: string;
  tags?: string[];
}

/**
 * 创建文章 Hook
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 创建成功后刷新文章列表
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

// ============================================
// 示例 4: 带乐观更新的删除
// ============================================

/**
 * 删除文章
 */
async function deletePost(id: string) {
  await api.delete(`/posts/${id}`);
}

/**
 * 删除文章 Hook - 带乐观更新
 */
function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    // 乐观更新
    onMutate: async (id) => {
      // 取消所有关于 posts 的请求，防止与乐观更新冲突
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // 保存旧数据以便回滚
      const previousPosts = queryClient.getQueryData(["posts"]);

      // 乐观更新：立即从缓存中移除
      queryClient.setQueryData(["posts"], (old: unknown) => {
        if (!old || typeof old !== "object") return old;
        const oldData = old as { list?: Post[] };
        return {
          ...oldData,
          list: oldData.list?.filter((post) => post.id !== id) || [],
        };
      });

      // 返回上下文，回滚时使用
      return { previousPosts };
    },
    onError: (_err, _id, context) => {
      // 错误时回滚
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
    onSettled: () => {
      // 无论成功失败，最后都重新获取最新数据
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

// ============================================
// 示例 5: 依赖查询
// ============================================

interface User {
  id: string;
  name: string;
  email: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author?: User;
}

/**
 * 获取用户详情
 */
async function fetchUser(id: string) {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
}

/**
 * 获取文章详情（包含作者信息）
 */
async function fetchPostWithAuthor(postId: string) {
  const response = await api.get<Post>(`/posts/${postId}`);
  const post = response.data;

  // 依赖查询：获取作者信息
  if (post.authorId) {
    post.author = await fetchUser(post.authorId);
  }

  return post;
}

/**
 * 文章详情 Hook - 依赖查询
 */
export function usePostWithAuthor(postId: string) {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchPostWithAuthor(postId),
    enabled: !!postId,
  });
}

// ============================================
// 示例 6: 并行查询
// ============================================

/**
 * 获取统计数据
 */
async function fetchDashboardStats() {
  const [posts, users, comments] = await Promise.all([
    api.get<{ total: number }>("/posts/count"),
    api.get<{ total: number }>("/users/count"),
    api.get<{ total: number }>("/comments/count"),
  ]);

  return {
    posts: posts.data.total,
    users: users.data.total,
    comments: comments.data.total,
  };
}

/**
 * 仪表盘统计 Hook
 */
function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: fetchDashboardStats,
    // 5 分钟不刷新
    staleTime: 5 * 60 * 1000,
  });
}

// ============================================
// 示例 7: 分页和无限滚动
// ============================================

/**
 * 获取分页文章 - 带有分页信息
 */
async function fetchPaginatedPosts(page: number, pageSize: number) {
  const response = await api.get<{
    list: Post[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>("/posts", { page, pageSize });

  return response.data;
}

/**
 * 分页文章 Hook
 */
function usePaginatedPosts(page: number, pageSize = 10) {
  return useQuery({
    queryKey: ["posts", "paginated", { page, pageSize }],
    queryFn: () => fetchPaginatedPosts(page, pageSize),
    placeholderData: keepPreviousData,
  });
}

// ============================================
// 示例组件：文章列表
// ============================================

/**
 * 文章列表组件示例
 */
export function PostList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = usePaginatedPosts(page);
  const deletePost = useDeletePost();

  if (isLoading) {
    return <div>加载中...</div>;
  }

  if (isError) {
    return <div>错误: {error.message}</div>;
  }

  return (
    <div>
      <h2>文章列表</h2>
      <ul>
        {data?.list.map((post) => (
          <li key={post.id}>
            <span>{post.title}</span>
            <button
              onClick={() => deletePost.mutate(post.id)}
              disabled={deletePost.isPending}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button disabled={page === 1} onClick={() => setPage(1)}>
          第一页
        </button>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          上一页
        </button>
        <span>
          第 {page} / {data?.totalPages || 1} 页
        </span>
        <button
          disabled={page === data?.totalPages}
          onClick={() => setPage(page + 1)}
        >
          下一页
        </button>
      </div>
    </div>
  );
}

/**
 * 仪表盘组件示例
 */
export function Dashboard() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h2>仪表盘</h2>
      <div>
        <div>文章数: {data?.posts}</div>
        <div>用户数: {data?.users}</div>
        <div>评论数: {data?.comments}</div>
      </div>
    </div>
  );
}

// 导出类型供外部使用
export type { Post, User, CreatePostData };
