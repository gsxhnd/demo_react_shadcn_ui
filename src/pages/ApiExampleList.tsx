import { useState, useCallback } from "react";
import {
  Code,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  Database,
  Globe,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

/**
 * 示例类型定义
 */
interface ApiExample {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  code: string;
  responseExample?: string;
}

/**
 * API 示例数据
 */
const apiExamples: ApiExample[] = [
  {
    id: "get-users",
    title: "获取用户列表",
    description: "使用 GET 请求获取用户列表，支持分页参数",
    icon: Database,
    method: "GET",
    endpoint: "/users",
    code: `import { api } from "@/lib/api";

// 获取用户列表
async function getUsers() {
  const response = await api.get("/users", {
    page: 1,
    pageSize: 10,
  });
  return response.data;
}

// 在组件中使用
function UsersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <div>加载中...</div>;

  return (
    <div>
      {data.list.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}`,
    responseExample: `{
  "list": [
    { "id": "1", "name": "张三", "email": "zhangsan@example.com" },
    { "id": "2", "name": "李四", "email": "lisi@example.com" }
  ],
  "total": 100,
  "page": 1,
  "pageSize": 10
}`,
  },
  {
    id: "create-user",
    title: "创建用户",
    description: "使用 POST 请求创建新用户",
    icon: Globe,
    method: "POST",
    endpoint: "/users",
    code: `import { api } from "@/lib/api";

// 创建用户
async function createUser(data: CreateUserData) {
  const response = await api.post("/users", data);
  return response.data;
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

// 在组件中使用
function CreateUserForm() {
  const createUser = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // 创建成功后刷新列表
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createUser.mutate({
      name: "王五",
      email: "wangwu@example.com",
      password: "123456",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? "创建中..." : "创建用户"}
      </button>
    </form>
  );
}`,
    responseExample: `{
  "id": "3",
  "name": "王五",
  "email": "wangwu@example.com",
  "createdAt": "2026-04-04T10:00:00Z"
}`,
  },
  {
    id: "update-user",
    title: "更新用户",
    description: "使用 PUT 请求更新用户信息",
    icon: Shield,
    method: "PUT",
    endpoint: "/users/:id",
    code: `import { api } from "@/lib/api";

// 更新用户
async function updateUser(id: string, data: UpdateUserData) {
  const response = await api.put(\`/users/\${id}\`, data);
  return response.data;
}

interface UpdateUserData {
  name?: string;
  email?: string;
}

// 在组件中使用
function EditUserForm({ userId }: { userId: string }) {
  const updateUser = useMutation({
    mutationFn: (data: UpdateUserData) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleUpdate = () => {
    updateUser.mutate({
      name: "更新的用户名",
    });
  };

  return (
    <button onClick={handleUpdate} disabled={updateUser.isPending}>
      {updateUser.isPending ? "更新中..." : "更新用户"}
    </button>
  );
}`,
    responseExample: `{
  "id": "1",
  "name": "更新的用户名",
  "email": "zhangsan@example.com",
  "updatedAt": "2026-04-04T11:00:00Z"
}`,
  },
  {
    id: "delete-user",
    title: "删除用户",
    description: "使用 DELETE 请求删除用户",
    icon: Zap,
    method: "DELETE",
    endpoint: "/users/:id",
    code: `import { api } from "@/lib/api";

// 删除用户
async function deleteUser(id: string) {
  await api.delete(\`/users/\${id}\`);
}

// 在组件中使用 - 带乐观更新
function UserItem({ user }: { user: User }) {
  const queryClient = useQueryClient();

  const deleteUser = useMutation({
    mutationFn: deleteUser,
    // 乐观更新
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData(["users"]);

      // 立即从 UI 移除
      queryClient.setQueryData(["users"], (old: any) => ({
        ...old,
        list: old.list.filter((u: User) => u.id !== id),
      }));

      return { previousUsers };
    },
    // 失败时回滚
    onError: (_err, _id, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
  });

  return (
    <div>
      <span>{user.name}</span>
      <button onClick={() => deleteUser.mutate(user.id)}>
        删除
      </button>
    </div>
  );
}`,
  },
];

/**
 * HTTP 方法颜色
 */
const methodColors: Record<string, string> = {
  GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  PUT: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  PATCH:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

/**
 * 代码块组件
 */
function CodeBlock({
  code,
  language = "typescript",
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="relative group rounded-lg bg-slate-900 dark:bg-slate-950 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
        <span className="text-xs text-slate-500 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              已复制
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              复制
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-slate-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}

/**
 * API 测试组件
 */
function ApiTester({
  endpoint,
  responseExample,
}: {
  endpoint: string;
  responseExample?: string;
}) {
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async () => {
    setIsLoading(true);
    setError(null);
    setTestResult(null);

    try {
      const response = await api.get(endpoint);
      setTestResult(JSON.stringify(response.data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handleTest}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            测试请求...
          </>
        ) : (
          "测试 API 请求"
        )}
      </Button>

      {error && (
        <div className="flex items-start gap-2 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {testResult && <CodeBlock code={testResult} language="json" />}

      {responseExample && !testResult && !error && (
        <div className="space-y-2">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            响应示例：
          </p>
          <CodeBlock code={responseExample} language="json" />
        </div>
      )}
    </div>
  );
}

/**
 * API 示例组件
 */
export function ApiExampleList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {apiExamples.map((example) => {
        const Icon = example.icon;
        const isExpanded = expandedId === example.id;

        return (
          <div
            key={example.id}
            className={cn(
              "border rounded-lg overflow-hidden transition-colors",
              "border-slate-200 dark:border-slate-700",
              "bg-white dark:bg-slate-900",
            )}
          >
            {/* 标题栏 */}
            <button
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              onClick={() => setExpandedId(isExpanded ? null : example.id)}
            >
              <div
                className={cn(
                  "p-2 rounded-lg",
                  "bg-slate-100 dark:bg-slate-800",
                )}
              >
                <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100">
                    {example.title}
                  </h3>
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-mono font-medium rounded",
                      methodColors[example.method],
                    )}
                  >
                    {example.method}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {example.description}
                </p>
              </div>
              <Code className="w-5 h-5 text-slate-400" />
            </button>

            {/* 展开内容 */}
            {isExpanded && (
              <div className="px-4 pb-4 space-y-4">
                {/* 端点信息 */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    端点:
                  </span>
                  <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
                    {example.endpoint}
                  </code>
                </div>

                {/* 代码示例 */}
                <CodeBlock code={example.code} />

                {/* API 测试 */}
                <ApiTester
                  endpoint={example.endpoint}
                  responseExample={example.responseExample}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ApiExampleList;
