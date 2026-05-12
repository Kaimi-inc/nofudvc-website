"use client"

import { useReveal } from "@/hooks/use-reveal"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-3 pl-8 pt-16 md:pl-24 md:px-12 md:pt-0 lg:pl-32 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-1.5 font-sans text-3xl font-light tracking-tight text-foreground md:mb-2 md:text-6xl lg:text-7xl">
            Ecosystem Building
          </h2>
          <p className="font-mono text-[10px] text-foreground/60 md:text-base">/ We share our expertise and resources with select groups that meet our criteria.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {[
            {
              title: "Product DNA",
              description: "Operator-led product thinking from founders who've built, sold, and scaled, applied as the core asset every project gets from day one.",
              direction: "top",
            },
            {
              title: "Venture Studio Collaborations",
              description: "Partnering with founders and capital allocators to launch new companies, where our product and operating expertise meets their capital, network, or domain edge.",
              direction: "right",
            },
            {
              title: "Operator Diligence",
              description: "Bringing product and operating expertise to investment decisions, helping partners evaluate, structure, and de-risk new ventures before capital commits.",
              direction: "left",
            },
            {
              title: "Ecosystem Building",
              description: "Actively shaping the Miami startup ecosystem — advising on its expansion and plugging our portfolio into the founders, capital, and talent emerging across the region.",
              direction: "bottom",
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-2 flex items-center gap-2 md:mb-3 md:gap-3">
        <div className="h-px w-6 bg-foreground/30 transition-all duration-300 group-hover:w-8 group-hover:bg-foreground/50 md:w-8 md:group-hover:w-12" />
        <span className="font-mono text-[10px] text-foreground/60 md:text-xs">0{index + 1}</span>
      </div>
      <h3 className="mb-1.5 font-sans text-xl font-light text-foreground md:mb-2 md:text-3xl">{service.title}</h3>
      <p className="max-w-sm text-xs leading-relaxed text-foreground/80 md:text-base">{service.description}</p>
    </div>
  )
}
