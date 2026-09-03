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
    title: "Lower-Middle-Market Private Equity",
    category:
      "PE firms with recurring software and technology-enabled deal flow who need independent screening and integrated diligence on platform and add-on targets. Two-to-three-week clock, IC-ready output, and evidence that reconciles technology, product, and operating findings against the investment thesis.",
    year: "Platform & Add-Ons",
  },
  {
    number: "02",
    title: "Independent Sponsors",
    category:
      "Deal-by-deal sponsors pursuing lower-middle-market software or technology-enabled acquisitions who want a senior buy-side diligence team without an in-house operating partner group. Fixed-fee scopes sized to the transaction, delivered by principals who defend the memo in front of LPs and the IC.",
    year: "Project Diligence",
  },
  {
    number: "03",
    title: "Growth Equity & Family Offices",
    category:
      "Direct investors underwriting software, AI, or data-heavy targets outside their internal technical expertise. We test whether the AI is production-ready, whether deal-critical metrics reconcile to source systems, and whether the roadmap being priced can actually be delivered by the current organization.",
    year: "Direct Investment",
    href: "#",
  },
  {
    number: "04",
    title: "Portfolio Boards & Sponsors",
    category:
      "Post-close mandates: a 100-day technology and AI value-creation plan, time-bound CTO or COO/CPO leadership to stabilize execution, or a portfolio-wide review of technology risk, AI maturity, and integration readiness across companies.",
    year: "Post Close",
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
            Services
          </h2>
          <p className="font-mono text-[10px] text-foreground/60 md:text-base">
            / Our work
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
