import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import DashboardSidebar from "./components/DashboardSidebar";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1 px-4 py-4">{children}</main>
    </SidebarProvider>
  );
}
