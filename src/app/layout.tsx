import { TailwindIndicator } from "@/components/TailwindIndicator";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/store/ReduxProvider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthLoader from "./components/AuthLoader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Simple app to generate QR codes, get analytics and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ReduxProvider>
            <AuthLoader />
            {children}
          </ReduxProvider>
          <Toaster />
          <TailwindIndicator />
        </body>
      </html>
    </ClerkProvider>
  );
}
