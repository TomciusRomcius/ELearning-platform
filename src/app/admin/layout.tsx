"use client";

import { SidebarLayout } from "./_layouts/SidebarLayout";
import { BodyLayout } from "./_layouts/BodyLayout";
import LinkOption from "@/frontend/ui/LinkOption";
import MainHeader from "@/frontend/ui/MainHeader/MainHeader";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background">
        <div className="h-screen flex flex-col">
        <SessionProvider>
          <MainHeader />
          <div className="flex flex-row w-screen flex-1 overflow-hidden">
            <SidebarLayout>
              <LinkOption
                className="text-lg text-text-grayed"
                highlightedClass="text-text-light"
                href="/admin/courses"
              >
                Courses
              </LinkOption>
            </SidebarLayout>
            <BodyLayout>{children}</BodyLayout>
          </div>
        </SessionProvider>
        </div>
      </body>
    </html>
  );
}
