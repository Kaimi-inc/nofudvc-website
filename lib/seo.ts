import type { Metadata } from "next"
import type { Note } from "@/lib/notes"
import { absoluteUrl, siteUrl } from "@/lib/site"

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: "Kaimi Advisory",
    url: siteUrl,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/logo.png"),
    email: "j@kaimi.co",
    description:
      "Buy-side technology, AI, and operational due diligence for lower-middle-market private equity firms and independent sponsors.",
    areaServed: ["New York", "Chicago", "Washington, DC", "Miami"],
    knowsAbout: [
      "technology due diligence",
      "AI due diligence",
      "operational due diligence",
      "agentic software development",
      "private equity",
    ],
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Kaimi Advisory",
    url: siteUrl,
    description:
      "Buy-side technology, AI, and operational due diligence for lower-middle-market private equity firms and independent sponsors.",
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-US",
    hasPart: {
      "@type": "Blog",
      "@id": `${absoluteUrl("/notes")}#blog`,
      name: "Notes",
      url: absoluteUrl("/notes"),
      description: "Essays from Kaimi Advisory on agentic software development, AI, and technology decisions.",
    },
  }
}

export function notePath(note: Note) {
  return `/notes/${note.slug}`
}

export function noteJsonLd(note: Note) {
  const url = absoluteUrl(notePath(note))
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: note.title,
    description: note.description || note.excerpt || note.title,
    abstract: note.description || note.excerpt,
    datePublished: note.date,
    dateModified: note.date,
    inLanguage: "en-US",
    url,
    keywords: note.keywords.join(", "),
    articleSection: "Notes",
    wordCount: wordCount(note.html),
    articleBody: plainText(note.html),
    author: note.author
      ? {
          "@type": "Person",
          name: note.author,
          affiliation: { "@id": `${siteUrl}/#organization` },
        }
      : undefined,
    publisher: { "@id": `${siteUrl}/#organization` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    image: absoluteUrl("/logo.png"),
  }
}

export function faqJsonLd(note: Note) {
  const sections = note.html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>([\s\S]*?)(?=<h[23][^>]*>|$)/gi)
  const mainEntity = [...sections].flatMap((match) => {
    const question = plainText(match[1])
    const answer = plainText(match[2])
    if (!question.endsWith("?") || !answer) return []
    return [
      {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      },
    ]
  })

  if (mainEntity.length === 0) return null

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(notePath(note))}#faq`,
    url: absoluteUrl(notePath(note)),
    mainEntity,
  }
}

function plainText(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
}

function wordCount(html: string) {
  const text = plainText(html)
  return text ? text.split(" ").length : 0
}

export function breadcrumbJsonLd(note: Note) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Kaimi Advisory", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Notes", item: absoluteUrl("/notes") },
      { "@type": "ListItem", position: 3, name: note.title, item: absoluteUrl(notePath(note)) },
    ],
  }
}

export function notesCollectionJsonLd(notes: Note[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/notes")}#collection`,
    name: "Notes",
    url: absoluteUrl("/notes"),
    description: "Essays from Kaimi Advisory on agentic software development, AI, and technology decisions.",
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: notes.map((note, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: note.title,
        url: absoluteUrl(notePath(note)),
      })),
    },
  }
}

export function notePageMetadata(note: Note): Metadata {
  const path = notePath(note)
  const description = note.description || note.excerpt || note.title

  return {
    title: note.title,
    description,
    keywords: note.keywords,
    authors: note.author ? [{ name: note.author }] : [{ name: "Kaimi Advisory", url: siteUrl }],
    alternates: {
      canonical: path,
      types: { "application/rss+xml": "/feed.xml" },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      type: "article",
      title: note.title,
      description,
      url: path,
      siteName: "Kaimi Advisory",
      publishedTime: note.date || undefined,
      modifiedTime: note.date || undefined,
      authors: note.author ? [note.author] : undefined,
      tags: note.keywords,
      images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Kaimi Advisory" }],
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description,
      images: ["/logo.png"],
    },
  }
}
