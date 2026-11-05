<template>
  <footer class="footer on-dark">
    <div class="footer__bigtype" aria-hidden="true">
      <span>Gasthof Barlida <em>·</em> Lainacherwirt <em>·</em> Gasthof Barlida <em>·</em> Lainacherwirt <em>·</em></span>
    </div>
    <div class="container footer__top">
      <NuxtLink to="/" class="footer__brand" aria-label="Gasthof Barlida – Startseite">
        <BrandMark class="footer__mark" />
        <span class="footer__name">Gasthof Barlida</span>
        <span class="footer__sub">Lainacherwirt</span>
      </NuxtLink>
      <p class="footer__tagline">{{ site.region }}</p>
    </div>

    <div class="container footer__inner">
      <nav class="footer__col" aria-label="Seiten">
        <p class="footer__heading">Entdecken</p>
        <ul class="footer__list">
          <li v-for="item in nav" :key="item.to">
            <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="footer__col">
        <p class="footer__heading">Besuchen</p>
        <address class="footer__address">
          Lainach 80<br />9833 Rangersdorf<br />Kärnten, Österreich
        </address>
      </div>

      <div class="footer__col">
        <p class="footer__heading">Kontakt</p>
        <ul class="footer__list">
          <li><a :href="site.phoneHref">{{ site.phone }}</a></li>
          <li><a :href="site.emailHref">{{ site.email }}</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <p class="footer__heading">Folgen</p>
        <ul class="footer__list">
          <li><a :href="site.social.instagram" target="_blank" rel="noopener">Instagram</a></li>
          <li><a :href="site.social.facebook" target="_blank" rel="noopener">Facebook</a></li>
        </ul>
      </div>
    </div>

    <div class="container footer__bottom">
      <p>© {{ year }} Gasthof Barlida · Lainacherwirt</p>
      <ul class="footer__legal">
        <li><NuxtLink to="/kontakt">Impressum</NuxtLink></li>
        <li><NuxtLink to="/kontakt">Datenschutz</NuxtLink></li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { nav, site } from '~/content/site'

const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--ink);
  color: var(--text-on-dark-muted);
  padding-top: var(--space-16);
  overflow: hidden;
}

/* Oversized wordmark that slides sideways as the footer scrolls in. */
.footer__bigtype {
  margin-bottom: var(--space-16);
  white-space: nowrap;
  font-family: var(--font-serif);
  font-size: clamp(5rem, 16vw, 15rem);
  font-weight: 300;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--gold) 55%, transparent);
}

.footer__bigtype span {
  display: inline-block;
}

.footer__bigtype em {
  font-style: normal;
  color: var(--gold);
  -webkit-text-stroke: 0;
}

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .footer__bigtype span {
      animation: bigtype linear both;
      animation-timeline: view();
      animation-range: entry 0% exit 40%;
    }
  }
}

@keyframes bigtype {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-40%);
  }
}

.footer a {
  color: var(--text-on-dark);
  text-decoration: none;
  transition: color var(--dur-base) var(--ease);
}

.footer a:hover {
  color: var(--gold);
}

.footer__top {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: var(--space-16);
  border-bottom: 1px solid var(--border-on-dark);
}

.footer__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.footer .footer__brand:hover {
  color: var(--text-on-dark);
}

.footer__mark {
  width: 3.5rem;
  color: var(--gold);
  margin-bottom: var(--space-4);
}

.footer__name {
  font-family: var(--font-serif);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 300;
  letter-spacing: 0.03em;
}

.footer__sub {
  margin-top: var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.4em;
  text-transform: uppercase;
  padding-left: 0.4em;
}

.footer__tagline {
  margin: var(--space-6) 0 0;
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-style: italic;
  font-weight: 300;
}

.footer__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12) var(--space-8);
  padding-block: var(--space-16);
}

.footer__heading {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 var(--space-6);
}

.footer__list,
.footer__legal {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer__list {
  display: grid;
  gap: var(--space-3);
  font-size: var(--text-sm);
  overflow-wrap: anywhere;
}

.footer__address {
  font-style: normal;
  font-size: var(--text-sm);
  line-height: 1.8;
}

.footer__bottom {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-block: var(--space-8);
  border-top: 1px solid var(--border-on-dark);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
}

.footer__bottom p {
  margin: 0;
}

.footer__legal {
  display: flex;
  gap: var(--space-6);
}

@media (min-width: 900px) {
  .footer__inner {
    grid-template-columns: repeat(4, 1fr);
  }

  .footer__bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

/* Room for the fixed mobile booking bar. */
@media (max-width: 639px) {
  .footer {
    padding-bottom: 4.5rem;
  }
}
</style>
