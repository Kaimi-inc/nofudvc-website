import type { MetadataRoute } from "next"
import { getNotes } from "@/lib/notes"
import { absoluteUrl } from "@/lib/site"

export const dynamic = "force-static"

function dateFromIso(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  if (!year || !month || !day) return new Date()
  return new Date(Date.UTC(year, month - 1, day))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getNotes()
  const latest = notes[0]?.date ? dateFromIso(notes[0].date) : new Date()

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/notes"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...notes.map((note) => ({
      url: absoluteUrl(`/notes/${note.slug}`),
      lastModified: note.date ? dateFromIso(note.date) : latest,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
