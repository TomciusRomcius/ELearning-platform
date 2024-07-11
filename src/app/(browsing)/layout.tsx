import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import MainHeader from "@/frontend/ui/MainHeader";
import SessionContainer from "@/frontend/ui/SessionContainer";
import { isAdmin } from "@/backend/utils/isAdmin";
import AdminHeader from "@/frontend/ui/AdminHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Learning plaftform",
  description: "E-Learning plaftform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUserAdmin = await isAdmin();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        {isUserAdmin ? <AdminHeader></AdminHeader> : null}
        <SessionContainer>
          <>{children}</>
        </SessionContainer>
      </body>
    </html>
  );
}
