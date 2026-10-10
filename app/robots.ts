import type { MetadataRoute } from "next"
import { absoluteUrl, siteUrl } from "@/lib/site"

export const dynamic = "force-static"

const aiAgents = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "Applebot-Extended"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...aiAgents.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  }
}
