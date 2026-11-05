/**
 * Title, description, social card and canonical for the current page. The
 * canonical follows the localized path (/en/zimmer → …/en/zimmer).
 */
export function usePageSeo(seo: { title: string; description: string; image: string; ogDescription?: string }) {
  const route = useRoute()
  const base = useRuntimeConfig().public.siteUrl as string
  const path = route.path === '/' ? '/' : route.path.replace(/\/$/, '')
  const url = `${base}${path}`

  useSeoMeta({
    title: seo.title,
    description: seo.description,
    ogTitle: seo.title,
    ogDescription: seo.ogDescription ?? seo.description,
    ogImage: `${base}${seo.image}`,
    ogUrl: url,
    ogType: 'website',
    twitterCard: 'summary_large_image',
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
