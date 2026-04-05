import { RouterProvider } from "react-router";
import { router } from "@/routes";
import { Toaster } from "@/components/ui/sonner";

function AppRouter() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default AppRouter;
