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
    default: "Kaimi Advisory — Technology, AI & Operational Diligence",
    template: "%s | Kaimi Advisory",
  },
  description:
    "Buy-side technology, AI, and operational due diligence for lower-middle-market private equity firms and independent sponsors. Principals in New York, Chicago, and Miami.",
  keywords: [
    "private equity advisory",
    "technology due diligence",
    "AI due diligence",
    "operational due diligence",
    "lower middle market",
    "buy-side diligence",
    "independent sponsors",
    "CTO advisory",
    "value creation",
    "Kaimi",
    "Kaimi Advisory",
  ],
  authors: [{ name: "Kaimi Advisory", url: siteUrl }],
  creator: "Kaimi Advisory",
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
    title: "Kaimi Advisory — Buy-Side Technology, AI & Operational Diligence",
    description:
      "Independent buy-side diligence for lower-middle-market private equity firms and independent sponsors. Two-to-three-week engagements led by CTO and COO/CPO principals in New York, Chicago, and Miami.",
    url: `${siteUrl}${basePath}/`,
    siteName: "Kaimi Advisory",
    images: [
      {
        url: `${basePath}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Kaimi Advisory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaimi Advisory — Buy-Side Technology, AI & Operational Diligence",
    description:
      "Independent buy-side diligence for lower-middle-market private equity firms and independent sponsors. Two-to-three-week engagements led by CTO and COO/CPO principals in New York, Chicago, and Miami.",
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