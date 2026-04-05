import type { ReactNode } from "react";
import { Outlet } from "react-router";
import { AppShell } from "@/layout";

interface SiteLayoutProps {
  children?: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return <AppShell>{children || <Outlet />}</AppShell>;
}
