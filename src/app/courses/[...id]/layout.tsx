import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import SessionContainer from "@/frontend/ui/SessionContainer";
import MainHeader from "@/frontend/ui/MainHeader/MainHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Learning plaftform",
  description: "E-Learning plaftform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <div className="flex flex-col w-screen h-screen">
          <MainHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
