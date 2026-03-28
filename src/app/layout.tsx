import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BotIdClient } from "botid/client";
import Script from "next/script";
import { ExternalLinkTracker } from "@/components/analytics/ExternalLinkTracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DThompsonDev",
  description: "Senior Developer Advocate, Community Leader, and Career Champion helping developers level up through mentorship, technical leadership, and authentic community building.",
};

// Routes protected by vercel BotID
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
        {/* Microsoft Clarity - Free behavioral analytics (heatmaps, session recordings) */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w30cqedux0");
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} antialiased bg-[#E2F3F2]`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
        <ExternalLinkTracker />
      </body>
    </html>
  );
}
