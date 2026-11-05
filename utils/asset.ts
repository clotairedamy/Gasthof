/**
 * Prefix a path under public/ with app.baseURL, so `/images/x.jpg` resolves to
 * `/Gasthof/images/x.jpg` on GitHub Pages and stays `/images/x.jpg` at a root
 * domain. Nuxt rewrites route links itself but not raw `src` attributes.
 */
export function asset(path: string): string {
  const base = useRuntimeConfig().app.baseURL.replace(/\/$/, '')
  return `${base}${path}`
}
