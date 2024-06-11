import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import MainHeader from "@/frontend/ui/MainHeader";
import SessionContainer from "@/frontend/ui/SessionContainer";

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
      <body className={`${inter.className} bg-background flex flex-col gap-10`}>
        <SessionContainer>
          <>
            {children}
          </>
        </SessionContainer>
      </body>
    </html>
  );
}
