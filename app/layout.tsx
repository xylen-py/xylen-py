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
  title: ".1xylen | Developer & Creator",
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
  authors: [{ name: ".1xylen", url: "https://github.com/xylen-py" }],
  creator: ".1xylen",
  metadataBase: new URL("https://xylen.dev"),
  openGraph: {
    title: ".1xylen | Developer & Creator",
    description:
      "Full-Stack Developer, Discord Bot Creator, and Open Source Enthusiast. Building premium digital experiences.",
    type: "website",
    siteName: ".1xylen",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: ".1xylen — Developer & Creator",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ".1xylen | Developer & Creator",
    description:
      "Full-Stack Developer, Discord Bot Creator, and Open Source Enthusiast.",
    images: ["/og-image.png"],
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
          title=".1xylen | Developer & Creator"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
