import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "@/routes";
import { Toaster } from "@/components/ui/sonner";

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
        <p className="text-slate-500 dark:text-slate-400">加载中...</p>
      </div>
    </div>
  );
}

function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={router} />
      <Toaster />
    </Suspense>
  );
}

export default AppRouter;
