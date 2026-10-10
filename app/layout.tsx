import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { jsonLdScript, organizationJsonLd, websiteJsonLd } from "@/lib/seo"
import { basePath, siteUrl } from "@/lib/site"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

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
    types: { "application/rss+xml": "/feed.xml" },
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
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteJsonLd()) }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}