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

const DISPLAY_NAME = "ζ͜͡Ð R Λ X ! T Y";
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
    "1xylen",
    "draxity",
    "xylen",
  ],
  authors: [{ name: DISPLAY_NAME, url: "https://github.com/xylen-py" }],
  creator: DISPLAY_NAME,
  metadataBase: new URL("https://1xylen.vercel.app"),    
  openGraph: {  
    title: TITLE,
    description: "Full-Stack Developer, Discord Bot Creator, and Open Source Enthusiast. Building premium digital experiences.",
    type: "website",
    siteName: DISPLAY_NAME,
    locale: "en_US",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `${DISPLAY_NAME} — Developer & Creator`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Full-Stack Developer, Discord Bot Creator, and Open Source Enthusiast.",
    images: ["/api/og"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
  },
  other: {
    "theme-color": "#2b2d31",
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
          title={TITLE}
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
