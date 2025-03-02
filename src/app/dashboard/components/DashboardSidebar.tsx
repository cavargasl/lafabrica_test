"use client";
import Logo from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { selectUser } from "@/store/slices/userSlice";
import {
  ChartNoAxesCombined,
  CreditCard,
  MessageCircleMore,
  MessageCircleQuestion,
  Plus,
  QrCode,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { NavUser } from "./NavUser";

const data = {
  mainNav: [
    {
      title: "Create new QR Code",
      url: "/dashboard/qr-code",
      icon: Plus,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: ChartNoAxesCombined,
    },
    {
      title: "My QR Codes",
      url: "/dashboard/my-qr",
      icon: QrCode,
    },
  ],
  userNav: [
    {
      title: "Account",
      url: "#",
      icon: User,
      disabled: true,
    },
    {
      title: "Billing",
      url: "#",
      icon: CreditCard,
      disabled: true,
    },
  ],
  extraNav: [
    {
      title: "Contact Us",
      url: "#",
      icon: MessageCircleMore,
      disabled: true,
    },
    {
      title: "FAQs",
      url: "#",
      icon: MessageCircleQuestion,
      disabled: true,
    },
  ],
};

export default function DashboardSidebar() {
  const { state } = useSidebar();
  const user = useSelector(selectUser);
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader
        className={cn(
          "flex items-center justify-center h-16 py-4",
          state === "expanded" && "items-start"
        )}
      >
        <Logo showText={state === "expanded"} />
      </SidebarHeader>
      <SidebarContent>
        <Separator />
        <SidebarGroup>
          <SidebarMenu>
            {data.mainNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center transition-colors hover:bg-primary hover:text-white",
                    pathname === item.url
                      ? "bg-primary text-white hover:bg-primary hover:text-white"
                      : ""
                  )}
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarMenu>
            {data.userNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="transition-colors hover:bg-primary hover:text-white">
                  <Link href={item.url} aria-disabled={item.disabled}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarMenu>
            {data.extraNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="transition-colors hover:bg-primary hover:text-white">
                  <Link href={item.url} aria-disabled={item.disabled}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
