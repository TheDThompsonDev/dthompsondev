import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BotIdClient } from "botid/client";
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
  title: "DThompsonDev",
  description: "Director of Technology, Community Leader, and Career Champion helping developers level up through mentorship, technical leadership, and authentic community building.",
};

// Routes protected by BotID
const protectedRoutes = [
  { path: '/api/contact', method: 'POST' as const },
  { path: '/api/newsletter', method: 'POST' as const },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <BotIdClient protect={protectedRoutes} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#E2F3F2]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
