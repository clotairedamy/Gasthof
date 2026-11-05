// Move focus and announce the page title on client-side navigation.
// Screen-reader users otherwise land at the top of the document with no
// announcement after an SPA route change.
//
// Runs on page:finish rather than router.afterEach: with the out-in page
// transition the new page (and its h1) only mounts after the old one leaves.
export default defineNuxtPlugin((nuxtApp) => {
  let navigated = false

  // Only real navigations, never the initial page load.
  useRouter().afterEach((_to, from) => {
    if (from.matched.length) navigated = true
  })

  nuxtApp.hook('page:finish', () => {
    if (!navigated) return
    navigated = false
    requestAnimationFrame(() => {
      const h1 = document.querySelector<HTMLElement>('main h1')
      const target = h1 ?? document.getElementById('main')
      if (target) {
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      }
      const announcer = document.getElementById('route-announcer')
      if (announcer && document.title) {
        announcer.textContent = document.title
      }
    })
  })
})
