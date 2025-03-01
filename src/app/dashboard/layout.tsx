import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
