"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/student/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/student/nav-user";

export default function Student({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathNames = pathname.split("/").filter((path) => path);

  const student = {
    name: "Nour Aldin Mohamed",
    email: "nourmhmd227@gmail.com"
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/student/dashboard">
                        Student
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    {(() => {
                      const subPaths = pathNames.filter(
                        (p) => p.toLowerCase() !== "student",
                      );

                      if (subPaths.length === 0) {
                        return (
                          <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                          </BreadcrumbItem>
                        );
                      }

                      return subPaths.map((link, index) => {
                        const href = `/student/${subPaths.slice(0, index + 1).join("/")}`;

                        const itemTitle = link
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(" ");

                        const isLast = index === subPaths.length - 1;
                        return (
                          <React.Fragment key={index}>
                            <BreadcrumbItem className="hidden md:block">
                              {isLast ? (
                                <BreadcrumbPage>{itemTitle}</BreadcrumbPage>
                              ) : (
                                <BreadcrumbLink href={href}>
                                  {itemTitle}
                                </BreadcrumbLink>
                              )}
                            </BreadcrumbItem>
                            {!isLast && (
                              <BreadcrumbSeparator className="hidden md:block" />
                            )}
                          </React.Fragment>
                        );
                      });
                    })()}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="pe-4">
                <NavUser
                  user={{
                    name: student.name.split(" ").slice(0, 2).join(" "),
                    email: student.email,
                    avatar: "",
                  }}
                />
              </div>
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}