"use client"

import * as React from "react"
import { Calendar, ChartColumn, LayoutDashboard, LifeBuoyIcon, ListTodo, SendIcon, Table2, GraduationCap } from "lucide-react"

import { SidebarFooter } from "@/components/student/sidebarFooter"
import { SidebarMain } from "./sidebarMain"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  sidebarMain: [
    {
      title: "Dashboard",
      url: "/student/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      title: "Study Schedule",
      url: "/student/study-schedule",
      icon: <Calendar />,
    },
    {
      title: "Courses Registration",
      url: "/student/courses-registration",
      icon: <ListTodo />,
    },
    {
      title: "Exams Schedule",
      url: "/student/exams-schedule",
      icon: <Table2 />,
    },
    {
      title: "Grades",
      url: "/student/grades",
      icon: <ChartColumn />,
    },
  ],
  sidebarFooter: [
    {
      title: "Support",
      url: "#",
      icon: <LifeBuoyIcon />,
    },
    {
      title: "Feedback",
      url: "#",
      icon: <SendIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/student">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  
                  <GraduationCap className="size-4" /> 
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold">Control System</span>
                  <span className="truncate text-xs text-muted-foreground">Faculty of Engineering</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMain items={data.sidebarMain} />
        <SidebarFooter items={data.sidebarFooter} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}