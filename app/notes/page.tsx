import type { Metadata } from "next"
import { NotesView } from "@/components/notes/notes-view"
import { getNotes } from "@/lib/notes"
import { faqJsonLd, jsonLdScript, noteJsonLd, notePageMetadata, notesCollectionJsonLd } from "@/lib/seo"

export const dynamic = "force-static"

export function generateMetadata(): Metadata {
  const notes = getNotes()
  const featured = notes[0]
  if (!featured) {
    return {
      title: "Notes",
      description: "Essays from Kaimi Advisory on agentic software development, AI, and technology decisions.",
      alternates: { canonical: "/notes" },
    }
  }

  return notePageMetadata(featured)
}

export default function NotesPage() {
  const notes = getNotes()
  const active = notes[0]

  if (!active) {
    return (
      <main className="flex h-dvh items-center justify-center bg-background px-6 text-foreground">
        <p className="font-sans text-2xl font-light">No notes yet.</p>
      </main>
    )
  }

  const faq = faqJsonLd(active)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(notesCollectionJsonLd(notes)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(noteJsonLd(active)) }} />
      {faq ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faq) }} /> : null}
      <NotesView notes={notes} active={active} />
    </>
  )
}
