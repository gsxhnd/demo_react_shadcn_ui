import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { SiteLayout } from "@/layout/SiteLayout";

const HomePage = lazy(() => import("@/pages/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const ApiDemoPage = lazy(() => import("@/pages/ApiDemoPage"));
const ComponentsPage = lazy(() => import("@/pages/ComponentsPage"));
const ComponentsDocsPage = lazy(() => import("@/pages/ComponentsDocsPage"));

function LoadingFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
        <p className="text-slate-500 dark:text-slate-400">加载中...</p>
      </div>
    </div>
  );
}

const routes = [
  {
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SiteLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/api-demo",
        element: <ApiDemoPage />,
      },
      {
        path: "/components",
        element: <ComponentsPage />,
      },
      {
        path: "/components/docs",
        element: <ComponentsDocsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(routes);

export { routes };
