<template>
  <div>
    <PageHero
      title="Kontakt"
      kicker="Anfahrt & Buchung"
      lead="Rufen Sie uns an oder schreiben Sie uns – wir helfen Ihnen gerne bei der Planung Ihres Aufenthalts."
      image="/images/terrace-1.jpg"
    />

    <section class="section">
      <div class="container contact">
        <div class="contact__cards">
          <article class="contact__card">
            <h2 class="contact__heading">Adresse</h2>
            <p>{{ site.address }}</p>
            <p class="contact__muted">{{ site.region }}</p>
          </article>

          <article class="contact__card">
            <h2 class="contact__heading">Telefon</h2>
            <p><a :href="site.phoneHref">{{ site.phone }}</a></p>
            <p class="contact__muted">Rufen Sie uns an, um direkt zu buchen.</p>
          </article>

          <article class="contact__card">
            <h2 class="contact__heading">E-Mail</h2>
            <p><a :href="site.emailHref">{{ site.email }}</a></p>
            <p class="contact__muted">Wir antworten so schnell wie möglich.</p>
          </article>
        </div>

        <div class="contact__map">
          <a
            v-reveal:image
            class="contact__map-link"
            data-cursor="Route"
            href="https://www.google.com/maps/search/?api=1&query=Lainach+80+9833+Rangersdorf+Austria"
            target="_blank"
            rel="noopener"
          >
            <img :src="asset('/images/hero.jpg')" alt="Anfahrt zum Gasthof Barlida – in Google Maps öffnen" width="960" height="600" loading="lazy" />
            <span class="contact__map-cta">Route in Google Maps öffnen</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { site } from '~/content/site'

const config = useRuntimeConfig()
const base = config.public.siteUrl as string

useSeoMeta({
  title: 'Kontakt | Gasthof Barlida',
  description: `Kontakt zum Gasthof Barlida – ${site.address}. Telefon: ${site.phone}. E-Mail: ${site.email}.`,
  ogTitle: 'Kontakt – Gasthof Barlida',
  ogImage: `${base}/images/terrace-1.jpg`,
})

useHead({
  link: [{ rel: 'canonical', href: `${base}/kontakt` }],
})
</script>

<style scoped>
.contact__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12) var(--space-8);
  margin-bottom: var(--space-16);
}

.contact__card {
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-strong);
}

.contact__heading {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--bronze);
  margin: 0 0 var(--space-4);
}

.contact__card p {
  margin: 0 0 var(--space-2);
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.contact__card a {
  color: var(--text);
  text-decoration-color: var(--border-strong);
}

.contact__card a:hover {
  color: var(--accent);
  text-decoration-color: currentColor;
}

.contact__card .contact__muted {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.contact__map-link {
  position: relative;
  display: block;
  overflow: hidden;
  text-decoration: none;
}

.contact__map-link img {
  width: 100%;
  aspect-ratio: 21 / 9;
  object-fit: cover;
  transition: transform 1.4s var(--ease-out);
}

.contact__map-link:hover img {
  transform: scale(1.03);
}

.contact__map-cta {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  min-height: 3rem;
  background: var(--canvas);
  color: var(--text);
  padding: var(--space-3) var(--space-8);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;
}

@media (min-width: 720px) {
  .contact__cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
