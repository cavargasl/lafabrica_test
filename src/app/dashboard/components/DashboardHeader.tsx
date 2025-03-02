import { SidebarTrigger } from "@/components/ui/sidebar"
import type React from "react"
interface DashboardHeaderProps {
  heading: string
  description?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, description, children }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center px-2 py-4 gap-2">
      <div className="flex gap-2 items-center">
      <SidebarTrigger />
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      </div>
      {children}
    </div>
  )
}

