"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-3 pt-16 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left side - Story */}
          <div>
            <div
              className={`mb-4 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-2xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                Building
                <br />
                diversified
                <br />
                <span className="text-foreground/40">wealth</span>
              </h2>
            </div>

            <div
              className={`space-y-2 transition-all duration-700 md:space-y-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-xs leading-relaxed text-foreground/90 md:text-lg">
              Kaimi Venture Studio builds a portfolio of focused, cash-generating businesses in markets the venture industry overlooks. We believe durable wealth is built by owning a portfolio of small, profitable companies that solve real problems for real customers.
              </p>
              <p className="max-w-md text-xs leading-relaxed text-foreground/90 md:text-lg">The venture playbook of the last decade optimized for scale, blitzscaling, and winner-take-all markets. </p>

              <p className="max-w-md text-xs leading-relaxed text-foreground/90 md:text-lg">That left thousands of valuable industries untouched, sectors too small, too unglamorous, or too operationally complex for traditional VCs to touch. These are the markets we build in: recruiting, talent, sports data, and the long tail of verticals where a focused product can generate $5M–$50M in revenue, serve customers exceptionally well, and compound for decades.</p>
              
              <p className="max-w-md text-xs leading-relaxed text-foreground/90 md:text-lg"></p>
            </div>
          </div>

          {/* Right side - Stats with creative layout */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-12">
            {[
              { value: "50+", label: "Projects", sublabel: "delivered worldwide", direction: "right" },
              { value: "13", label: "Years", sublabel: "of innovation across companies", direction: "left" },
              { value: "7", label: "Awards", sublabel: "industry recognition", direction: "right" },
              { value: "3", label: "Exits", sublabel: "across verticals", direction: "left" },
            ].map((stat, i) => {
              const getRevealClass = () => {
                if (!isVisible) {
                  return stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                }
                return "translate-x-0 opacity-100"
              }

              return (
                <div
                  key={i}
                  className={`flex items-baseline gap-3 border-l border-foreground/30 pl-3 transition-all duration-700 md:gap-8 md:pl-8 ${getRevealClass()}`}
                  style={{
                    transitionDelay: `${300 + i * 150}ms`,
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: i % 2 === 0 ? "100%" : "85%",
                  }}
                >
                  <div className="text-2xl font-light text-foreground md:text-6xl lg:text-7xl">{stat.value}</div>
                  <div>
                    <div className="font-sans text-sm font-light text-foreground md:text-xl">{stat.label}</div>
                    <div className="font-mono text-[10px] text-foreground/60 md:text-xs">{stat.sublabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 md:mt-16 md:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >

        </div>
      </div>
    </section>
  )
}
