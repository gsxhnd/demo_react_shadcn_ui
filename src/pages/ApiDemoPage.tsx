import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { LanguageTransition } from "@/components/ui/language-transition";
import { IconShowcase } from "@/components/ui/icon-showcase";
import { ApiExampleList } from "@/components/ui/api-example-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ApiDemoPage() {
  const { t } = useTranslation();

  return (
    <LanguageTransition className="container py-8 max-w-5xl">
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("apiDemo.title")}</h1>
        <p className="text-slate-600 dark:text-slate-400">
          {t("apiDemo.description")}
        </p>
      </div>

      <Tabs defaultValue="icons" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="icons">{t("apiDemo.tabs.icons")}</TabsTrigger>
          <TabsTrigger value="api">{t("apiDemo.tabs.api")}</TabsTrigger>
          <TabsTrigger value="hooks">{t("apiDemo.tabs.hooks")}</TabsTrigger>
        </TabsList>

        <TabsContent value="icons">
          <IconShowcase />
        </TabsContent>

        <TabsContent value="api">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{t("apiDemo.apiTitle") || "API 请求封装"}</h2>
              <p className="text-slate-600 dark:text-slate-400">
                {t("apiDemo.apiDescription") || "基于 Fetch API 封装了统一的请求方法，支持请求/响应拦截器。"}
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
              <h2 className="text-2xl font-bold mb-2">{t("apiDemo.hooksTitle") || "React Query Hooks"}</h2>
              <p className="text-slate-600 dark:text-slate-400">
                {t("apiDemo.hooksDescription") || "封装了常用的 React Query hooks，提供更好的开发体验。"}
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
    </LanguageTransition>
  );
}

export default ApiDemoPage;
