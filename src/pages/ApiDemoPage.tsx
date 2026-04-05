import { useTranslation } from "react-i18next";
import { ApiExampleList } from "@/pages/ApiExampleList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero, PageSection } from "@/layout";

function ApiDemoPage() {
  const { t } = useTranslation();

  return (
    <div>
      <PageHero
        title="接口接入参考"
        description="模板中 API 封装、图标系统和 Query hooks 的接入方式说明"
      />

      <PageSection>
        <Tabs defaultValue="api" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="api">{t("apiDemo.tabs.api")}</TabsTrigger>
            <TabsTrigger value="hooks">{t("apiDemo.tabs.hooks")}</TabsTrigger>
            <TabsTrigger value="icons">{t("apiDemo.tabs.icons")}</TabsTrigger>
          </TabsList>

          <TabsContent value="api">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">API 请求封装</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  基于 Fetch API 封装的统一请求方法，支持请求/响应拦截器。
                  项目中所有接口调用均通过此层发起。
                </p>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3>{t("apiDemo.coreFeatures") || "核心特性"}</h3>
                <ul>
                  <li>{t("apiDemo.feature1") || "统一的请求方法 (get, post, put, patch, delete)"}</li>
                  <li>{t("apiDemo.feature2") || "自动添加时间戳防止缓存"}</li>
                  <li>{t("apiDemo.feature3") || "请求/响应拦截器支持"}</li>
                  <li>{t("apiDemo.feature4") || "自动处理 JSON 数据"}</li>
                  <li>{t("apiDemo.feature5") || "统一的错误处理"}</li>
                  <li>{t("apiDemo.feature6") || "TypeScript 类型支持"}</li>
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
                  基于 TanStack Query 封装的 hooks，提供数据缓存、加载状态和错误处理能力。
                  页面级数据获取推荐使用这些 hooks。
                </p>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3>{t("apiDemo.providedHooks") || "提供的 Hooks"}</h3>
                <ul>
                  <li>
                    <code>useApiQuery</code> - {t("apiDemo.useApiQuery") || "通用的查询 hook"}
                  </li>
                  <li>
                    <code>useApiMutation</code> - {t("apiDemo.useApiMutation") || "通用的突变 hook"}
                  </li>
                  <li>
                    <code>useUserList</code> - {t("apiDemo.useUserList") || "用户列表查询"}
                  </li>
                  <li>
                    <code>useUserDetail</code> - {t("apiDemo.useUserDetail") || "用户详情查询"}
                  </li>
                  <li>
                    <code>useCreateUser</code> - {t("apiDemo.useCreateUser") || "创建用户"}
                  </li>
                  <li>
                    <code>useUpdateUser</code> - {t("apiDemo.useUpdateUser") || "更新用户"}
                  </li>
                  <li>
                    <code>useDeleteUser</code> - {t("apiDemo.useDeleteUser") || "删除用户"}
                  </li>
                </ul>

                <h3>{t("apiDemo.queryKeyTitle") || "Query Key 管理"}</h3>
                <p>
                  {t("apiDemo.queryKeyDescription") || "使用"} <code>queryKeys</code> {t("apiDemo.queryKeyText") || "工厂统一管理所有 query keys，"}
                  {t("apiDemo.queryKeyText2") || "确保 key 的一致性和可维护性。"}
                </p>

                <h3>{t("apiDemo.usageExample") || "使用示例"}</h3>
              </div>

              <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 overflow-x-auto">
                <code>{`import { useApiQuery, useApiMutation, queryKeys } from "@/lib/useApiQuery";

// ${t("apiDemo.queryExample") || "查询示例"}
function UserList() {
  const { data, isLoading, error } = useApiQuery("/users", {
    page: 1,
    pageSize: 10,
  });

  if (isLoading) return <div>${t("common.loading")}</div>;
  if (error) return <div>${t("common.error")}: {error.message}</div>;

  return (
    <ul>
      {data.list.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// ${t("apiDemo.mutationExample") || "突变示例"}
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
        {createUser.isPending ? "${t("apiDemo.creating") || "创建中..."}" : "${t("apiDemo.createUser") || "创建用户"}"}
      </button>
    </form>
  );
}

// ${t("apiDemo.queryKeyUsage") || "使用 queryKeys"}
const queryKey = queryKeys.user.list({ page: 1, pageSize: 10 });
// ${t("apiDemo.queryKeyResult") || "结果"}: ["user", "list", { page: 1, pageSize: 10 }]`}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </PageSection>
    </div>
  );
}

export default ApiDemoPage;
