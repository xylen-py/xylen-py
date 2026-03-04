import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "xylen | Developer & Creator",
  description:
    "Full-Stack Developer, Discord Bot Creator, and Open Source Enthusiast. Building premium digital experiences with React, Next.js, and Node.js.",
  keywords: [
    "developer",
    "portfolio",
    "full-stack",
    "next.js",
    "react",
    "discord bot",
    "open source",
    "1xylen",
    "draxity",
    "xylen",
  ],
  authors: [{ name: "xylen", url: "https://github.com/xylen-py" }],
  creator: "xylen",
  metadataBase: new URL("https://xylen.vercel.app"),
  openGraph: {
    title: "xylen | Developer & Creator",
    description:
      "Full-Stack Developer, Discord Bot Creator, and Open Source Enthusiast. Building premium digital experiences.",
    type: "website",
    siteName: "xylen",
    locale: "en_US",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "xylen — Developer & Creator",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "xylen | Developer & Creator",
    description:
      "Full-Stack Developer, Discord Bot Creator, and Open Source Enthusiast.",
    images: ["/api/og"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
  },
  other: {
    "theme-color": "#a78bfa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/json+oembed"
          href="/api/oembed?format=json"
          title="xylen | Developer & Creator"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased noise-overlay`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
