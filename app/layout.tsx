import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kaimi.co"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export const metadata: Metadata = {
  title: {
    default: "Kaimi — Venture Studio",
    template: "%s | Kaimi",
  },
  description:
    "Miami-based venture studio building focused, cash-generating businesses in markets the venture industry overlooks — recruiting, talent, sports data, and beyond.",
  keywords: [
    "venture studio",
    "Miami",
    "startup studio",
    "recruiting",
    "talent",
    "sports data",
    "Kaimi",
    "portfolio companies",
    "operator-led",
  ],
  authors: [{ name: "Kaimi Venture Studio", url: siteUrl }],
  creator: "Kaimi Venture Studio",
  icons: {
    icon: `${basePath}/logo.png`,
    shortcut: `${basePath}/logo.png`,
    apple: `${basePath}/logo.png`,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}${basePath}/`,
  },
  openGraph: {
    title: "Kaimi — Venture Studio",
    description:
      "Building focused, profitable companies in markets the venture industry overlooks. Based in Miami, operating across LATAM and Europe.",
    url: `${siteUrl}${basePath}/`,
    siteName: "Kaimi",
    images: [
      {
        url: `${basePath}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Kaimi Venture Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaimi — Venture Studio",
    description:
      "Building focused, profitable companies in markets the venture industry overlooks. Based in Miami, operating across LATAM and Europe.",
    images: [`${basePath}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
