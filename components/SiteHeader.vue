<template>
  <header class="header" :class="{ 'header--solid': solid, 'header--hidden': hidden, 'on-dark': !solid }">
    <div class="header__bar">
      <button
        ref="toggleEl"
        type="button"
        class="header__toggle"
        :aria-expanded="open"
        aria-controls="site-menu"
        @click="openMenu"
      >
        <span class="header__toggle-lines" aria-hidden="true"><span></span><span></span></span>
        <span class="header__toggle-label">Menü</span>
      </button>

      <NuxtLink to="/" class="header__brand" aria-label="Gasthof Barlida – Startseite">
        <BrandMark class="header__mark" />
        <span class="header__brand-name">Gasthof Barlida</span>
        <span class="header__brand-sub">Lainacherwirt</span>
      </NuxtLink>

      <div class="header__actions">
        <a :href="site.phoneHref" class="header__phone" :aria-label="`Anrufen: ${site.phone}`">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        </a>
        <a :href="site.phoneHref" class="btn header__cta" :class="solid ? 'btn--primary' : 'btn--outline-light'">Anfragen</a>
      </div>
    </div>

    <Transition name="menu">
      <div
        v-if="open"
        id="site-menu"
        ref="menuEl"
        class="menu on-dark"
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        @keydown="onMenuKeydown"
      >
        <div class="menu__bar">
          <button ref="closeEl" type="button" class="header__toggle" @click="closeMenu">
            <span class="header__toggle-lines header__toggle-lines--x" aria-hidden="true"><span></span><span></span></span>
            <span class="header__toggle-label">Schließen</span>
          </button>
          <NuxtLink to="/" class="header__brand" aria-label="Gasthof Barlida – Startseite" @click="closeMenu">
            <BrandMark class="header__mark" />
            <span class="header__brand-name">Gasthof Barlida</span>
            <span class="header__brand-sub">Lainacherwirt</span>
          </NuxtLink>
          <span aria-hidden="true"></span>
        </div>

        <div class="menu__body">
          <nav class="menu__nav" aria-label="Hauptnavigation">
            <ul class="menu__list">
              <li v-for="(item, i) in menuItems" :key="item.to" class="menu__item" :style="{ '--i': i }">
                <NuxtLink :to="item.to" class="menu__link" @click="closeMenu">
                  <span class="menu__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <aside class="menu__aside">
            <img class="menu__img" :src="asset('/images/hero.jpg')" alt="" width="640" height="427" loading="lazy" />
            <div class="menu__contact">
              <p class="kicker">Kontakt</p>
              <address class="menu__address">{{ site.address }}</address>
              <p><a :href="site.phoneHref">{{ site.phone }}</a></p>
              <p><a :href="site.emailHref">{{ site.email }}</a></p>
              <p class="menu__social">
                <a :href="site.social.instagram" target="_blank" rel="noopener">Instagram</a>
                <a :href="site.social.facebook" target="_blank" rel="noopener">Facebook</a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { nav, site } from '~/content/site'

const route = useRoute()
const open = ref(false)
const solid = ref(false)
const hidden = ref(false)
let lastY = 0
const toggleEl = ref<HTMLButtonElement>()
const closeEl = ref<HTMLButtonElement>()
const menuEl = ref<HTMLElement>()

const menuItems = [{ label: 'Startseite', to: '/' }, ...nav]

// Solid once off the hero; tucked away while scrolling down, back on the
// way up.
function onScroll() {
  const y = window.scrollY
  solid.value = y > 40
  hidden.value = !open.value && y > lastY && y > 600
  lastY = y
}

async function openMenu() {
  open.value = true
  document.body.classList.add('is-locked')
  await nextTick()
  closeEl.value?.focus()
}

function closeMenu() {
  if (!open.value) return
  open.value = false
  document.body.classList.remove('is-locked')
  toggleEl.value?.focus()
}

// Keep Tab inside the dialog; Escape closes it.
function onMenuKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeMenu()
    return
  }
  if (event.key !== 'Tab' || !menuEl.value) return
  const focusables = menuEl.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.classList.remove('is-locked')
})

// Navigating (including back/forward) closes the menu without stealing focus
// from the route-focus plugin.
watch(() => route.path, () => {
  open.value = false
  document.body.classList.remove('is-locked')
})
</script>

<style scoped>
.header {
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 50;
  color: var(--text-on-dark);
  transition: background-color var(--dur-slow) var(--ease), color var(--dur-slow) var(--ease),
    box-shadow var(--dur-slow) var(--ease), translate var(--dur-slow) var(--ease-out);
}

/* Never hidden while the menu is open (onScroll), so the translate never
   re-anchors the fixed menu. Keyboard focus always brings it back. */
.header--hidden:not(:focus-within) {
  translate: 0 -100%;
}

/* Soft scrim so the transparent header reads over any photograph. */
.header::before {
  content: '';
  position: absolute;
  inset: 0 0 -3rem;
  background: linear-gradient(180deg, rgb(var(--scrim) / 0.5), rgb(var(--scrim) / 0));
  pointer-events: none;
  transition: opacity var(--dur-slow) var(--ease);
}

.header--solid {
  background: var(--canvas);
  color: var(--text);
  box-shadow: 0 1px 0 var(--border);
}

.header--solid::before {
  opacity: 0;
}

.header__bar,
.menu__bar {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: var(--space-4);
  height: var(--header-h);
  padding-inline: clamp(var(--space-4), 3vw, var(--space-12));
  transition: height var(--dur-slow) var(--ease);
}

.header--solid .header__bar {
  height: var(--header-h-compact);
}

/* Menu toggle */
.header__toggle {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 44px;
  padding: var(--space-2) var(--space-2) var(--space-2) 0;
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  cursor: pointer;
}

.header__toggle-lines {
  position: relative;
  display: inline-block;
  width: 28px;
  height: 10px;
}

.header__toggle-lines span {
  position: absolute;
  left: 0;
  height: 1px;
  background: currentColor;
  transition: width var(--dur-base) var(--ease), transform var(--dur-base) var(--ease);
}

.header__toggle-lines span:first-child {
  top: 0;
  width: 100%;
}

.header__toggle-lines span:last-child {
  bottom: 0;
  width: 64%;
}

.header__toggle:hover .header__toggle-lines span:last-child {
  width: 100%;
}

.header__toggle-lines--x span:first-child {
  top: 50%;
  transform: rotate(35deg);
}

.header__toggle-lines--x span:last-child {
  bottom: auto;
  top: 50%;
  width: 100%;
  transform: rotate(-35deg);
}

.header__toggle-label {
  display: none;
}

/* Brand */
.header__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  line-height: 1;
  text-align: center;
}

.header__brand:hover {
  color: inherit;
}

.header__mark {
  width: 2.25rem;
  margin-bottom: var(--space-1);
  transition: width var(--dur-slow) var(--ease), opacity var(--dur-slow) var(--ease);
}

.header--solid .header__bar .header__mark {
  width: 0;
  margin: 0;
  opacity: 0;
}

.header__brand-name {
  font-family: var(--font-serif);
  font-size: clamp(1.25rem, 2.4vw, 1.6rem);
  font-weight: 400;
  letter-spacing: 0.04em;
}

.header__brand-sub {
  margin-top: var(--space-1);
  font-size: 0.625rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  padding-left: 0.4em;
}

/* Right side */
.header__actions {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.header__phone {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: inherit;
}

.header__phone svg {
  width: 1.15rem;
  height: 1.15rem;
}

.header__cta {
  display: none;
  min-height: 2.75rem;
  padding-inline: var(--space-6);
}

/* Full-screen menu */
.menu {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  flex-direction: column;
  background: var(--ink);
  color: var(--text-on-dark);
  overflow-y: auto;
}

.menu__body {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  align-items: center;
  padding: var(--space-8) clamp(var(--space-6), 6vw, var(--space-32)) var(--space-16);
}

.menu__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu__item {
  border-bottom: 1px solid var(--border-on-dark);
  animation: menu-item var(--dur-slow) var(--ease-out) both;
  animation-delay: calc(var(--i) * 60ms + 120ms);
}

.menu__link {
  display: flex;
  align-items: baseline;
  gap: var(--space-6);
  padding-block: var(--space-4);
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  line-height: 1.1;
  text-decoration: none;
  color: var(--text-on-dark);
  transition: color var(--dur-base) var(--ease), padding var(--dur-base) var(--ease);
}

.menu__link:hover,
.menu__link.router-link-exact-active {
  color: var(--gold);
}

.menu__link:hover {
  padding-left: var(--space-3);
}

.menu__num {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  letter-spacing: 0.2em;
  color: var(--gold);
}

.menu__aside {
  display: none;
}

.menu__img {
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  margin-bottom: var(--space-8);
}

.menu__contact {
  color: var(--text-on-dark-muted);
  font-size: var(--text-sm);
}

.menu__contact a {
  color: var(--text-on-dark);
  text-decoration: none;
}

.menu__contact a:hover {
  color: var(--gold);
}

.menu__address {
  font-style: normal;
  margin-bottom: var(--space-4);
}

.menu__contact p {
  margin: 0 0 var(--space-2);
}

.menu__social {
  display: flex;
  gap: var(--space-6);
  margin-top: var(--space-6) !important;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: var(--text-xs);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity var(--dur-slow) var(--ease), clip-path var(--dur-slow) var(--ease-out);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  clip-path: inset(0 0 100% 0);
}

@keyframes menu-item {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

@media (min-width: 640px) {
  .header__toggle-label {
    display: inline;
  }

  .header__cta {
    display: inline-flex;
  }
}

@media (min-width: 960px) {
  .menu__body {
    grid-template-columns: 1.4fr 1fr;
    gap: var(--space-24);
  }

  .menu__aside {
    display: block;
  }
}
</style>
