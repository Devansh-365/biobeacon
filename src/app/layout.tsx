import { NextAuthProvider } from "@/components/providers/auth-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BioBeacon",
  description:
    "An Open-Source Solution for Streamlining Your Social Media Links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
