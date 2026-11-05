// Scroll-triggered reveals. The server renders nothing, so content is visible
// without JavaScript; the client hides an element only while it is below the
// fold, then reveals it on intersection.
//
//   v-reveal            fade up
//   v-reveal="150"      … with a delay in ms
//   v-reveal:image      curtain wipe with a counter-scaled image
//   v-reveal:image.left … wiping in from the left
//   v-split             headline whose words rise out of a mask
import type { Directive } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | undefined
  // Observed element → elements it reveals. Usually the same element; image
  // curtains observe their parent instead, because a fully clipped element
  // never reports an intersection in Chrome.
  const targets = new Map<Element, Set<HTMLElement>>()

  function observe(el: HTMLElement, trigger: Element = el) {
    observer ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          targets.get(entry.target)?.forEach((t) => t.classList.add('is-visible'))
          targets.delete(entry.target)
          observer!.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    if (!targets.has(trigger)) targets.set(trigger, new Set())
    targets.get(trigger)!.add(el)
    observer.observe(trigger)
  }

  function unobserve(el: HTMLElement) {
    for (const [trigger, set] of targets) {
      if (!set.delete(el) || set.size) continue
      targets.delete(trigger)
      observer?.unobserve(trigger)
    }
  }

  // Skip reduced motion, and anything already on screen at mount, which
  // would otherwise flash out and back in.
  function shouldAnimate(el: HTMLElement) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return el.getBoundingClientRect().top > window.innerHeight * 0.92
  }

  const reveal: Directive<HTMLElement, number | undefined> = {
    getSSRProps: () => ({}),
    mounted(el, binding) {
      if (!shouldAnimate(el)) return
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      if (binding.arg === 'image') {
        el.classList.add('reveal-img')
        if (binding.modifiers.left) el.classList.add('reveal-img--left')
        observe(el, el.parentElement ?? el)
      } else {
        el.classList.add('reveal')
        observe(el)
      }
    },
    beforeUnmount: unobserve,
  }

  // Wrap each word in a mask. Only for headings whose text never changes
  // after mount: Vue would otherwise patch the replaced text nodes.
  function splitWords(el: HTMLElement) {
    el.setAttribute('aria-label', el.textContent?.replace(/\s+/g, ' ').trim() ?? '')
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    let index = 0
    for (const node of nodes) {
      const fragment = document.createDocumentFragment()
      for (const part of (node.textContent ?? '').split(/(\s+)/)) {
        if (!part) continue
        if (/^\s+$/.test(part)) {
          fragment.append(' ')
          continue
        }
        const mask = document.createElement('span')
        mask.className = 'split-word'
        mask.setAttribute('aria-hidden', 'true')
        const word = document.createElement('span')
        word.className = 'split-word__inner'
        word.style.setProperty('--w', String(index++))
        word.textContent = part
        mask.append(word)
        fragment.append(mask)
      }
      node.replaceWith(fragment)
    }
  }

  const split: Directive<HTMLElement> = {
    getSSRProps: () => ({}),
    mounted(el) {
      if (!shouldAnimate(el)) return
      splitWords(el)
      el.classList.add('is-split')
      observe(el)
    },
    beforeUnmount: unobserve,
  }

  nuxtApp.vueApp.directive('reveal', reveal)
  nuxtApp.vueApp.directive('split', split)
})
