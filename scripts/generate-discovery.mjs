import fs from "fs"
import path from "path"

const site = "https://kaimi.co"
const notesDir = path.join(process.cwd(), "content/notes")
const publicDir = path.join(process.cwd(), "public")

function decode(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
}

function plain(html) {
  return decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim()
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function toMarkdown(html) {
  return decode(
    html
      .replace(/<h2[^>]*>/gi, "\n\n## ")
      .replace(/<h3[^>]*>/gi, "\n\n### ")
      .replace(/<\/h[23]>/gi, "\n")
      .replace(/<li>/gi, "\n- ")
      .replace(/<\/li>/gi, "")
      .replace(/<\/?ul>/gi, "\n")
      .replace(/<\/?ol>/gi, "\n")
      .replace(/<blockquote>/gi, "\n\n> ")
      .replace(/<\/blockquote>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function readNote(filename) {
  const slug = filename.replace(/\.html$/, "")
  const raw = fs.readFileSync(path.join(notesDir, filename), "utf8")
  const comment = raw.match(/^<!--\s*([\s\S]*?)-->/)
  const meta = {}
  if (comment) {
    for (const line of comment[1].split("\n")) {
      const splitAt = line.indexOf(":")
      if (splitAt === -1) continue
      const key = line.slice(0, splitAt).trim().toLowerCase()
      const value = line.slice(splitAt + 1).trim()
      if (key && value) meta[key] = value
    }
  }
  const html = (comment ? raw.slice(comment[0].length) : raw).trim()
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    author: meta.author || "Kaimi Advisory",
    description: meta.description || meta.excerpt || plain(html).slice(0, 280),
    html,
  }
}

const notes = fs
  .readdirSync(notesDir)
  .filter((filename) => filename.endsWith(".html") && !filename.startsWith("_"))
  .map(readNote)
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))

const fullText = notes
  .map((note) => {
    const url = `${site}/notes/${note.slug}`
    return [`# ${note.title}`, `Author: ${note.author}`, `Date: ${note.date}`, `Canonical: ${url}`, "", toMarkdown(note.html)].join("\n")
  })
  .join("\n\n---\n\n")

fs.writeFileSync(path.join(publicDir, "llms-full.txt"), `${fullText}\n`, "utf8")

const items = notes
  .map((note) => {
    const url = `${site}/notes/${note.slug}`
    const [year, month, day] = note.date.split("-").map(Number)
    const pubDate = year && month && day ? new Date(Date.UTC(year, month - 1, day)).toUTCString() : new Date().toUTCString()
    return `    <item>
      <title>${escapeXml(note.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(note.author)}</dc:creator>
      <description><![CDATA[${note.description}]]></description>
    </item>`
  })
  .join("\n")

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Kaimi Advisory Notes</title>
    <link>${site}/notes</link>
    <description>Essays from Kaimi Advisory on agentic software development, AI, and technology decisions.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`

fs.writeFileSync(path.join(publicDir, "feed.xml"), feed, "utf8")
