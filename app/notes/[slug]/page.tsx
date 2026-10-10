import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NotesView } from "@/components/notes/notes-view"
import { getNote, getNotes } from "@/lib/notes"
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, noteJsonLd, notePageMetadata } from "@/lib/seo"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return getNotes().map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) return { title: "Notes" }
  return notePageMetadata(note)
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const notes = getNotes()
  const active = getNote(slug)
  if (!active) notFound()

  const faq = faqJsonLd(active)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(noteJsonLd(active)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(active)) }} />
      {faq ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faq) }} /> : null}
      <NotesView notes={notes} active={active} />
    </>
  )
}
