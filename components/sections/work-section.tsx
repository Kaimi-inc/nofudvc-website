"use client"

import { useState, useCallback } from "react"
import { useReveal } from "@/hooks/use-reveal"

interface Project {
  number: string
  title: string
  category: string
  year: string
  href?: string
}

const projects: Project[] = [
  {
    number: "01",
    title: "Aperturio",
    category:
      "Aperturio is talent placement reimagined as a conversational service. Instead of briefing a recruiter or filling out an intake form, you just ask Claude or Slack and the service startys sourcing the best candidates in the market for you. Backed by a recruiter on the ground it turns hiring from a process into a request.",
    year: "2024",
    href: "https://aperturio.com",
  },
  {
    number: "02",
    title: "Augtal",
    category:
      "Augtal is an AI recruiting automation SaaS built for small staffing agencies and independent recruiters, replacing the work typically outsourced to BD agencies. Its product suite, Signals, ResumeRank, a LinkedIn extension, and ATS integrations, speeds up candidate sourcing, automates candidate scoring, and outreach end-to-end.",
    year: "2025",
    href: "https://augtal.com",
  },
  {
    number: "03",
    title: "OLTA.football",
    category:
      "Open League Tactical Analysis · is a football intelligence and storytelling platform that transforms real-time match data into narratives, insights, and content for fans, media, and clubs. Think of it as the layer that turns raw football data into something readable, shareable, and worth following beyond the scoreline.",
    year: "2026",
    href: "https://olta.football",
  },
  {
    number: "04",
    title: "Stealth Startup",
    category:
      "A stealth startup in the building management space leveraging AU to facilitate better economics.",
    year: "2026",
  },
]

const DESKTOP_PER_PAGE = 3

function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )
}

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [currentPage, setCurrentPage] = useState(0)

  const desktopPages = chunkArray(projects, DESKTOP_PER_PAGE)
  const totalDesktopPages = desktopPages.length
  const totalMobilePages = projects.length

  const desktopPage = Math.min(currentPage, totalDesktopPages - 1)
  const mobilePage = Math.min(currentPage, totalMobilePages - 1)

  const goNext = useCallback(() => {
    setCurrentPage((prev) => prev + 1)
  }, [])

  const goPrev = useCallback(() => {
    setCurrentPage((prev) => prev - 1)
  }, [])

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-3 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-1.5 font-sans text-3xl font-light tracking-tight text-foreground md:mb-2 md:text-6xl lg:text-7xl">
            Portfolio
          </h2>
          <p className="font-mono text-[10px] text-foreground/60 md:text-base">
            / Our companies
          </p>
        </div>

        {/* Desktop slideshow: 3 per page */}
        <div
          className={`hidden md:block transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${desktopPage * 100}%)` }}
            >
              {desktopPages.map((page, pageIdx) => (
                <div
                  key={pageIdx}
                  className="grid w-full shrink-0 grid-cols-3 gap-6"
                >
                  {page.map((project) => (
                    <ProjectCard key={project.number} project={project} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={goPrev}
              disabled={currentPage === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Previous page"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 12L6 8L10 4" />
              </svg>
            </button>
            <button
              onClick={goNext}
              disabled={desktopPage >= totalDesktopPages - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Next page"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4L10 8L6 12" />
              </svg>
            </button>

            <div className="flex items-center gap-2 ml-2">
              {desktopPages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === desktopPage
                      ? "w-6 bg-foreground/70"
                      : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <span className="ml-auto font-mono text-xs text-foreground/40">
              {desktopPage + 1} / {totalDesktopPages}
            </span>
          </div>
        </div>

        {/* Mobile slideshow: 1 per page */}
        <div
          className={`md:hidden transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${mobilePage * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.number} className="w-full shrink-0 px-1">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={goPrev}
              disabled={currentPage === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Previous project"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 12L6 8L10 4" />
              </svg>
            </button>
            <button
              onClick={goNext}
              disabled={mobilePage >= totalMobilePages - 1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Next project"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4L10 8L6 12" />
              </svg>
            </button>

            <div className="flex items-center gap-1.5 ml-1">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === mobilePage
                      ? "w-5 bg-foreground/70"
                      : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex h-full flex-col justify-between rounded-lg border border-foreground/10 p-4 transition-colors duration-300 hover:border-foreground/25 md:p-6">
      <div>
        <div className="mb-3 flex items-center justify-between md:mb-4">
          <span className="font-mono text-[10px] text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-xs">
            {project.number}
          </span>
          <span className="font-mono text-[10px] text-foreground/30 md:text-xs">
            {project.year}
          </span>
        </div>

        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 inline-block font-sans text-xl font-light text-foreground underline-offset-4 transition-transform duration-300 hover:underline group-hover:translate-x-1 md:mb-3 md:text-2xl lg:text-3xl"
          >
            {project.title}
          </a>
        ) : (
          <h3 className="mb-2 font-sans text-xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-1 md:mb-3 md:text-2xl lg:text-3xl">
            {project.title}
          </h3>
        )}

        <p className="font-mono text-[10px] leading-relaxed text-foreground/50 md:text-sm">
          {project.category}
        </p>
      </div>

      {project.href && (
        <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] text-foreground/40 transition-colors group-hover:text-foreground/70 md:mt-6 md:text-xs">
          <span>View project</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      )}
    </div>
  )
}
