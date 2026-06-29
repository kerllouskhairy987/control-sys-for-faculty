"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/professor/app-sidebar";
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
import { NavUser } from "@/components/professor/nav-user";
import { ThemeProvider } from "@/components/student/theme-provider";
import { DirectionProvider } from "@radix-ui/react-direction";

export default function ProfessorLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const pathname = usePathname();
  const pathNames = pathname.split("/").filter((path) => path);
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <div lang={locale} dir={direction} suppressHydrationWarning>
      <DirectionProvider dir={direction}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                <div className="flex justify-between w-full">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                      orientation="vertical"
                      className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                    />
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href="/professor/dashboard">
                            Professor
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        {(() => {
                          const subPaths = pathNames.filter(
                            (p) => p.toLowerCase() !== "professor",
                          );

                          if (subPaths.length === 0) {
                            return (
                              <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbPage>Dashboard</BreadcrumbPage>
                              </BreadcrumbItem>
                            );
                          }

                          return subPaths.map((link, index) => {
                            const href = `/professor/${subPaths.slice(0, index + 1).join("/")}`;

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

                  <div className="flex items-center">
                    <NavUser />
                  </div>
                </div>
              </header>

              <main className="flex-1">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </DirectionProvider>
    </div>
  );
}