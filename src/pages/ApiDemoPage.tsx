import { IconShowcase } from "@/components/ui/icon-showcase";
import { ApiExampleList } from "@/components/ui/api-example-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ApiDemoPage() {
  return (
    <div className="container py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">数据请求与图标</h1>
        <p className="text-slate-600 dark:text-slate-400">
          本页面展示了 v0.3.0 版本新增的功能：
          React Query 数据请求和 Lucide React 图标系统。
        </p>
      </div>

      <Tabs defaultValue="icons" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="icons">图标系统</TabsTrigger>
          <TabsTrigger value="api">API 请求</TabsTrigger>
          <TabsTrigger value="hooks">Hooks 用法</TabsTrigger>
        </TabsList>

        <TabsContent value="icons">
          <IconShowcase />
        </TabsContent>

        <TabsContent value="api">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">API 请求封装</h2>
              <p className="text-slate-600 dark:text-slate-400">
                基于 Fetch API 封装了统一的请求方法，支持请求/响应拦截器。
              </p>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3>核心特性</h3>
              <ul>
                <li>统一的请求方法 (get, post, put, patch, delete)</li>
                <li>自动添加时间戳防止缓存</li>
                <li>请求/响应拦截器支持</li>
                <li>自动处理 JSON 数据</li>
                <li>统一的错误处理</li>
                <li>TypeScript 类型支持</li>
              </ul>
            </div>

            <ApiExampleList />
          </div>
        </TabsContent>

        <TabsContent value="hooks">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">React Query Hooks</h2>
              <p className="text-slate-600 dark:text-slate-400">
                封装了常用的 React Query hooks，提供更好的开发体验。
              </p>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3>提供的 Hooks</h3>
              <ul>
                <li>
                  <code>useApiQuery</code> - 通用的查询 hook
                </li>
                <li>
                  <code>useApiMutation</code> - 通用的突变 hook
                </li>
                <li>
                  <code>useUserList</code> - 用户列表查询
                </li>
                <li>
                  <code>useUserDetail</code> - 用户详情查询
                </li>
                <li>
                  <code>useCreateUser</code> - 创建用户
                </li>
                <li>
                  <code>useUpdateUser</code> - 更新用户
                </li>
                <li>
                  <code>useDeleteUser</code> - 删除用户
                </li>
              </ul>

              <h3>Query Key 管理</h3>
              <p>
                使用 <code>queryKeys</code> 工厂统一管理所有 query keys，
                确保 key 的一致性和可维护性。
              </p>

              <h3>使用示例</h3>
            </div>

            <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 overflow-x-auto">
              <code>{`import { useApiQuery, useApiMutation, queryKeys } from "@/lib/useApiQuery";

// 查询示例
function UserList() {
  const { data, isLoading, error } = useApiQuery("/users", {
    page: 1,
    pageSize: 10,
  });

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <ul>
      {data.list.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// 突变示例
function CreateUserForm() {
  const createUser = useApiMutation("post", "/users");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createUser.mutateAsync({
      name: "张三",
      email: "zhangsan@example.com",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? "创建中..." : "创建用户"}
      </button>
    </form>
  );
}

// 使用 queryKeys
const queryKey = queryKeys.user.list({ page: 1, pageSize: 10 });
// 结果: ["user", "list", { page: 1, pageSize: 10 }]`}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ApiDemoPage;
