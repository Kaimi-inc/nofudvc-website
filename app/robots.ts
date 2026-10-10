import type { MetadataRoute } from "next"
import { absoluteUrl, siteUrl } from "@/lib/site"

export const dynamic = "force-static"

/** Search indexes and fetches a person triggered. Not used for model training. */
const discoveryAgents = ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot"]

/**
 * Training crawlers only.
 * Google-Extended and Applebot-Extended do not affect Google Search or Applebot.
 */
const trainingAgents = ["GPTBot", "ClaudeBot", "anthropic-ai", "Google-Extended", "Applebot-Extended"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...discoveryAgents.map((userAgent) => ({ userAgent, allow: "/" })),
      ...trainingAgents.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  }
}
