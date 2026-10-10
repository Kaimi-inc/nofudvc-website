"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import type { Note, TocItem } from "@/lib/notes"

interface NotesViewProps {
  notes: Note[]
  active: Note
}

export function NotesView({ notes, active }: NotesViewProps) {
  const [activeHeading, setActiveHeading] = useState(active.toc[0]?.id ?? "")

  useEffect(() => {
    setActiveHeading(active.toc[0]?.id ?? "")
    const root = document.getElementById("note-article")
    if (!root || active.toc.length === 0) return

    const headings = active.toc
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveHeading(visible[0].target.id)
      },
      { root, rootMargin: "0px 0px -65% 0px", threshold: 0.1 },
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [active])

  function scrollToHeading(id: string) {
    setActiveHeading(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", `#${id}`)
  }

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-background text-foreground">
      <CustomCursor />
      <GrainOverlay />

      <div className="fixed inset-0 z-0" style={{ contain: "strict" }}>
        <Shader className="h-full w-full">
          <Swirl
            colorA="#141210"
            colorB="#8B6B4A3D"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#C4956A"
            upColor="#D4A574"
            downColor="#F5EDE5"
            leftColor="#F5EDE5"
            rightColor="#F0E8DF"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <header className="flex shrink-0 items-center justify-between px-4 py-4 md:px-10 md:py-5">
          <Link href="/" className="flex items-center transition-transform hover:scale-105" aria-label="Kaimi Advisory home">
            <Image src="/logo.png" alt="Kaimi Advisory" width={200} height={200} className="h-14 w-auto md:h-16" priority />
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70 md:text-xs">Notes</p>
        </header>

        <div className="shrink-0 border-y border-foreground/15 md:hidden">
          <NotesIndex notes={notes} activeSlug={active.slug} orientation="row" />
        </div>

        <div className="flex min-h-0 flex-1">
          <article id="note-article" className="notes-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-16 pt-8 md:px-12 md:pb-24 md:pt-12 lg:px-16">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <time
                  dateTime={active.date || undefined}
                  className="inline-block rounded-full border border-foreground/20 bg-foreground/15 px-3 py-1 font-mono text-[10px] text-foreground/90 backdrop-blur-md md:px-4 md:py-1.5 md:text-xs"
                >
                  {active.displayDate || "Note"}
                </time>
                {active.author ? (
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70 md:text-xs">{active.author}</p>
                ) : null}
              </div>
              <h1 className="font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                {active.title}
              </h1>
              {active.excerpt ? (
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-foreground/70 md:text-lg">{active.excerpt}</p>
              ) : null}

              <div className="sticky top-0 z-10 -mx-4 mt-8 border-y border-foreground/15 bg-black/75 px-4 py-4 backdrop-blur-md md:hidden">
                <Contents toc={active.toc} activeHeading={activeHeading} onSelect={scrollToHeading} />
              </div>

              <div className="note-body mt-10" dangerouslySetInnerHTML={{ __html: active.html }} />
            </div>
          </article>

          <aside className="hidden w-80 shrink-0 flex-col border-l border-foreground/15 bg-black/25 backdrop-blur-md md:flex lg:w-96">
            <div className="shrink-0 border-b border-foreground/15 px-6 py-6">
              <Contents toc={active.toc} activeHeading={activeHeading} onSelect={scrollToHeading} />
            </div>
            <div className="notes-scroll min-h-0 flex-1 overflow-y-auto px-6 py-6">
              <NotesIndex notes={notes} activeSlug={active.slug} orientation="stack" />
            </div>
          </aside>
        </div>

        <footer className="flex shrink-0 flex-col gap-2 border-t border-foreground/15 px-4 py-4 font-mono text-[10px] text-foreground/60 sm:flex-row sm:items-center sm:justify-between md:px-10 md:text-xs">
          <p>Kaimi Advisory</p>
          <p className="text-foreground/50">New York · Chicago · Washington, DC · Miami</p>
          <a href="mailto:j@kaimi.co" className="transition-colors hover:text-foreground">
            j [at] kaimi.co
          </a>
        </footer>
      </div>
    </main>
  )
}

function Contents({
  toc,
  activeHeading,
  onSelect,
}: {
  toc: TocItem[]
  activeHeading: string
  onSelect: (id: string) => void
}) {
  return (
    <nav aria-label="On this page">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">On this page</p>
      {toc.length === 0 ? (
        <p className="mt-3 text-sm text-foreground/45">Headings in the note appear here.</p>
      ) : (
        <ol className="mt-4 space-y-2">
          {toc.map((item) => {
            const isActive = item.id === activeHeading
            return (
              <li key={item.id} className={item.level === 3 ? "pl-4" : undefined}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault()
                    onSelect(item.id)
                  }}
                  className={`block text-left text-sm leading-snug transition-colors ${
                    isActive ? "text-foreground" : "text-foreground/55 hover:text-foreground"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            )
          })}
        </ol>
      )}
    </nav>
  )
}

function NotesIndex({
  notes,
  activeSlug,
  orientation,
}: {
  notes: Note[]
  activeSlug: string
  orientation: "stack" | "row"
}) {
  return (
    <nav aria-label="All notes">
      <p className={`font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50 ${orientation === "row" ? "sr-only" : ""}`}>
        All notes
      </p>
      <ul className={orientation === "row" ? "flex gap-2 overflow-x-auto px-4 py-3" : "mt-4 space-y-2"}>
        {notes.map((note) => {
          const isActive = note.slug === activeSlug
          return (
            <li key={note.slug} className={orientation === "row" ? "shrink-0" : undefined}>
              <Link
                href={`/notes/${note.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={
                  orientation === "row"
                    ? `block rounded-full border px-3 py-1.5 font-mono text-[10px] transition-colors ${
                        isActive
                          ? "border-foreground/40 bg-foreground/15 text-foreground"
                          : "border-foreground/15 text-foreground/60 hover:text-foreground"
                      }`
                    : `block border-l py-3 pl-4 transition-colors ${
                        isActive
                          ? "border-foreground bg-foreground/10"
                          : "border-foreground/20 hover:border-foreground/50 hover:bg-foreground/5"
                      }`
                }
              >
                {orientation === "stack" ? (
                  <>
                    {note.displayDate || note.author ? (
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                        {[note.displayDate, note.author].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                    <p className={`font-sans text-lg font-light leading-snug ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                      {note.title}
                    </p>
                    {note.excerpt ? <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-foreground/55">{note.excerpt}</p> : null}
                  </>
                ) : (
                  note.title
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
