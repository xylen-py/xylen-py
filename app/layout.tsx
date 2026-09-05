import type { Metadata } from "next";
import "./globals.css";

const DISPLAY_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "xylen";
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "xylen-py";
const TITLE = `${DISPLAY_NAME} • Developer`;
const DESCRIPTION = "Full-Stack Developer, Discord Bot Creator, and Open Source Enthusiast.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "developer",
    "portfolio",
    "full-stack",
    "next.js",
    "react",
    "discord bot",
    "open source",
    DISPLAY_NAME,
    GITHUB_USERNAME,
  ],
  authors: [{ name: DISPLAY_NAME, url: `https://github.com/${GITHUB_USERNAME}` }],
  creator: DISPLAY_NAME,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://1xylen.vercel.app"),    
  openGraph: {  
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    siteName: DISPLAY_NAME,
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}