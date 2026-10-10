export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kaimi.co"
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export function absoluteUrl(path: string) {
  if (path === "/") return `${siteUrl}${basePath}/`
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${siteUrl}${basePath}${normalized}`
}
