import fs from "fs"
import path from "path"

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

export interface Note {
  slug: string
  title: string
  date: string
  displayDate: string
  author: string
  excerpt: string
  description: string
  keywords: string[]
  html: string
  toc: TocItem[]
}

const NOTES_DIR = path.join(process.cwd(), "content/notes")

function formatNoteDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  if (!year || !month || !day) return iso
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function stripTags(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function prepareBody(html: string) {
  const toc: TocItem[] = []
  const used = new Set<string>()

  const withIds = html.replace(/<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi, (_full, level: string, attrs: string = "", inner: string) => {
    const text = stripTags(inner)
    const existing = /id="([^"]+)"/.exec(attrs)
    let id = existing?.[1] || slugifyHeading(text) || `section-${toc.length + 1}`
    let unique = id
    let suffix = 2
    while (used.has(unique)) {
      unique = `${id}-${suffix}`
      suffix += 1
    }
    used.add(unique)
    toc.push({ id: unique, text, level: Number(level) as 2 | 3 })
    if (existing) return `<h${level}${attrs}>${inner}</h${level}>`
    return `<h${level} id="${unique}">${inner}</h${level}>`
  })

  return { html: withIds, toc }
}

function readNote(filename: string): Note | null {
  const slug = filename.replace(/\.html$/, "")
  const raw = fs.readFileSync(path.join(NOTES_DIR, filename), "utf8")
  const comment = raw.match(/^<!--\s*([\s\S]*?)-->/)
  const meta: Record<string, string> = {}

  if (comment) {
    for (const line of comment[1].split("\n")) {
      const splitAt = line.indexOf(":")
      if (splitAt === -1) continue
      const key = line.slice(0, splitAt).trim().toLowerCase()
      const value = line.slice(splitAt + 1).trim()
      if (key && value) meta[key] = value
    }
  }

  const body = (comment ? raw.slice(comment[0].length) : raw).trim()
  const { html, toc } = prepareBody(body)
  const title = meta.title || slug
  const date = meta.date || ""

  const keywords = (meta.keywords ?? "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean)

  return {
    slug,
    title,
    date,
    displayDate: date ? formatNoteDate(date) : "",
    author: meta.author || "",
    excerpt: meta.excerpt || "",
    description: meta.description || meta.excerpt || "",
    keywords,
    html,
    toc,
  }
}

export function getNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return []

  return fs
    .readdirSync(NOTES_DIR)
    .filter((filename) => filename.endsWith(".html") && !filename.startsWith("_"))
    .map(readNote)
    .filter((note): note is Note => note !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
}

export function getNote(slug: string) {
  return getNotes().find((note) => note.slug === slug) ?? null
}
