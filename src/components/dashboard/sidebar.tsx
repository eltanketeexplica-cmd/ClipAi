"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Video, 
  Clapperboard, 
  Settings, 
  CreditCard, 
  PlusCircle, 
  Zap,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Projects",
    url: "/dashboard/projects",
    icon: Clapperboard,
  },
  {
    title: "New Video",
    url: "/dashboard/upload",
    icon: PlusCircle,
  },
]

const accountItems = [
    {
        title: "Subscription",
        url: "/dashboard/billing",
        icon: CreditCard,
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-white/10 bg-black">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-purple-500 fill-purple-500" />
          <span className="text-xl font-bold tracking-tighter text-white">ClipForge</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500">Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />} isActive={pathname === item.url} className="hover:bg-white/5 text-gray-300 active:text-white">
                      <item.icon />
                      <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />} isActive={pathname === item.url} className="hover:bg-white/5 text-gray-300">
                      <item.icon />
                      <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-3 mb-4">
            <p className="text-xs font-semibold text-purple-400 mb-1">FREE PLAN</p>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-1/3" />
            </div>
            <p className="text-[10px] text-gray-400 mt-2">1 of 3 clips used this month</p>
        </div>
        <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5 px-2">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
