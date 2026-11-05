<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero on-dark" aria-label="Willkommen">
      <div class="hero__media">
        <img
          class="hero__bg"
          :src="asset('/images/hero.jpg')"
          alt=""
          width="1920"
          height="1281"
          fetchpriority="high"
        />
      </div>
      <div class="hero__scrim" aria-hidden="true"></div>
      <div class="hero__content">
        <BrandMark class="hero__mark" />
        <p class="hero__kicker">Lainach · Mölltal · Kärnten</p>
        <h1 class="hero__title">
          <span class="sr-only">Gasthof Barlida</span>
          <span class="hero__letters" aria-hidden="true">
            <span v-for="(word, w) in titleWords" :key="word" class="hero__word">
              <span v-for="(char, c) in word" :key="c" class="hero__char" :style="{ '--c': w * 3 + c }">{{ char }}</span>
            </span>
          </span>
        </h1>
        <p class="hero__subtitle">Authentisches Alpenerlebnis zwischen Mölltal-Gletscher und Großglockner</p>
        <div class="hero__actions">
          <NuxtLink to="/zimmer" class="btn btn--light">Zimmer entdecken</NuxtLink>
          <a :href="site.phoneHref" class="btn btn--outline-light">Anfragen</a>
        </div>
      </div>
      <a href="#willkommen" class="hero__scroll">
        <span>Entdecken</span>
        <span class="hero__scroll-line" aria-hidden="true"></span>
      </a>
    </section>

    <TrustMarquee :items="promises" />

    <!-- Intro -->
    <section id="willkommen" class="section intro" aria-labelledby="intro-heading">
      <img class="intro__texture" :src="asset('/images/gallery-3.jpg')" alt="" width="1920" height="1047" loading="lazy" />
      <div class="container intro__inner">
        <p v-reveal class="kicker">Willkommen</p>
        <h2 id="intro-heading" v-split class="display intro__title">
          Lassen Sie die Berge sprechen. <em>Und hören Sie, wie still es wird.</em>
        </h2>
        <div class="intro__body">
          <p v-reveal="100" class="intro__lead">
            Entdecken Sie den Charme des Gasthofs Barlida – eine einladende Unterkunft
            inmitten der majestätischen Kulisse der österreichischen Alpen, zwischen den
            Gletschern des Mölltals und dem Großglockner, nur einen Steinwurf von den
            Lienzer Dolomiten entfernt. Hier bietet jede Jahreszeit einzigartige und
            unvergessliche Erlebnisse.
          </p>
          <dl v-reveal="200" class="intro__facts">
            <div class="intro__fact">
              <dt>Zimmer, Suiten &amp; Apartments</dt>
              <dd>{{ rooms.length }}</dd>
            </div>
            <div class="intro__fact">
              <dt>Plätze im Restaurant</dt>
              <dd>50</dd>
            </div>
            <div class="intro__fact">
              <dt>Plätze auf der Terrasse</dt>
              <dd>20</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Rooms -->
    <div class="section section--alt">
      <RoomSlider
        :rooms="rooms"
        kicker="Übernachten"
        title="Zimmer, Suiten & Apartments"
        more-to="/zimmer"
        more-label="Alle Zimmer"
      />
    </div>

    <!-- Restaurant band + Restaurant / Bar / Terrasse -->
    <ImageBand
      image="/images/restaurant-1.jpg"
      label="Restaurant Lainacherwirt"
      kicker="Genuss im Haus"
    >
      Hier entstehen Geschichten – bei einem guten Glas und herzlicher Gastfreundschaft.
    </ImageBand>

    <div class="section">
      <ExperienceTabs :items="highlights" kicker="Restaurant Lainacherwirt" title="Restaurant, Bar & Terrasse" />
    </div>

    <!-- About -->
    <section class="story section--ink on-dark" aria-labelledby="about-heading">
      <div v-reveal:image.left class="story__media">
        <img :src="asset('/images/about-1.jpg')" alt="Die Gastgeberfamilie vor verschneiten Berggipfeln" width="1200" height="1600" loading="lazy" />
      </div>
      <div class="story__body">
        <div v-reveal class="story__inner">
          <p class="kicker">Über uns</p>
          <h2 id="about-heading" class="story__title">Ein Ort mit <em>Herz</em> in den Bergen</h2>
          <p class="story__text">{{ about.intro }}</p>
          <blockquote class="story__quote">
            <p>„Wir bieten mehr als nur Unterkunft – wir schenken Wärme, Aufmerksamkeit und eine schöne Erinnerung inmitten der Natur.“</p>
          </blockquote>
          <NuxtLink to="/ueber-uns" class="link-line">Unsere Geschichte</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="section" aria-labelledby="gallery-heading">
      <div class="container">
        <div class="gallery-head">
          <div>
            <p v-reveal class="kicker">Galerie</p>
            <h2 id="gallery-heading" v-split class="gallery-head__title">Eindrücke aus dem Haus</h2>
          </div>
          <div class="gallery-head__links">
            <NuxtLink to="/galerie" class="link-line">Zur Galerie</NuxtLink>
            <a :href="site.social.instagram" class="link-line" target="_blank" rel="noopener">Instagram</a>
          </div>
        </div>
        <ul class="mosaic">
          <li v-for="(img, i) in mosaic" :key="img.src" class="mosaic__item">
            <img v-reveal:image="i * 90" :src="asset(img.src)" :alt="img.alt" width="800" height="800" loading="lazy" />
          </li>
        </ul>
      </div>
    </section>

    <!-- Mountains band -->
    <ImageBand
      image="/images/hero.jpg"
      label="Ankommen"
      kicker="Ankommen"
      position="center 18%"
      cta-to="/kontakt"
      cta-label="Aufenthalt planen"
    >
      Frische Bergluft, weite Wälder – und ein Zuhause auf Zeit.
    </ImageBand>

    <!-- Location -->
    <section class="section section--alt" aria-labelledby="location-heading">
      <div class="container location">
        <div v-reveal:image class="location__media">
          <img :src="asset('/images/terrace-1.jpg')" alt="Die Terrasse des Gasthofs mit Blumen und Holzschnitzerei" width="1600" height="1066" loading="lazy" />
        </div>
        <div v-reveal class="location__body">
          <p class="kicker">Anreise</p>
          <h2 id="location-heading" v-split class="location__title">Lainach, im Herzen des Mölltals</h2>
          <address class="location__address">
            {{ site.legalName }}<br />
            Lainach 80, 9833 Rangersdorf<br />
            Kärnten, Österreich
          </address>
          <dl class="location__contact">
            <div>
              <dt>Telefon</dt>
              <dd><a :href="site.phoneHref">{{ site.phone }}</a></dd>
            </div>
            <div>
              <dt>E-Mail</dt>
              <dd><a :href="site.emailHref">{{ site.email }}</a></dd>
            </div>
          </dl>
          <div class="location__actions">
            <a :href="mapsUrl" class="btn btn--primary" target="_blank" rel="noopener">Route planen</a>
            <a :href="site.phoneHref" class="btn btn--ghost">Anrufen</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { promises, site } from '~/content/site'
import { rooms } from '~/content/rooms'
import { highlights } from '~/content/restaurant'
import { about } from '~/content/about'
import { gallery } from '~/content/gallery'

const titleWords = ['Gasthof', 'Barlida']

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Lainach+80+9833+Rangersdorf+Austria'

const mosaicSources = [
  '/images/restaurant-1.jpg',
  '/images/terrace-2.jpg',
  '/images/bar-1.jpg',
  '/images/suite-3-1.jpg',
  '/images/terrace-3.jpg',
  '/images/restaurant-4.jpg',
]
const mosaic = mosaicSources
  .map((src) => gallery.find((img) => img.src === src))
  .filter((img) => img !== undefined)

const config = useRuntimeConfig()
const base = config.public.siteUrl as string

useSeoMeta({
  title: 'Gasthof Barlida – Lainacherwirt',
  description:
    'Familiengeführte Unterkunft in Lainach, zwischen Mölltal-Gletscher und Großglockner. Zimmer, Suiten & Apartments, Restaurant, Bar und Terrasse.',
  ogTitle: 'Gasthof Barlida – Lainacherwirt',
  ogDescription:
    'Authentisches Alpenerlebnis zwischen Mölltal-Gletscher und Großglockner.',
  ogImage: `${base}/images/hero.jpg`,
  ogUrl: `${base}/`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: `${base}/` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Hotel',
        name: site.legalName,
        description:
          'Familiengeführte Unterkunft in Lainach, zwischen Mölltal-Gletscher und Großglockner, mit Zimmern, Suiten, Apartments, Restaurant, Bar und Terrasse.',
        image: [`${base}/images/hero.jpg`],
        telephone: site.phone,
        email: site.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Lainach 80',
          postalCode: '9833',
          addressLocality: 'Rangersdorf',
          addressCountry: 'AT',
        },
      }),
    },
  ],
})
</script>

<style scoped>
/* Hero */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-on-dark);
  overflow: hidden;
}

.hero__media {
  position: absolute;
  inset: 0;
}

.hero__bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: hero-zoom 14s var(--ease-out) both;
}

.hero__scrim {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at center, rgb(var(--scrim) / 0.5) 0%, rgb(var(--scrim) / 0.15) 70%),
    linear-gradient(180deg, rgb(var(--scrim) / 0.2) 0%, rgb(var(--scrim) / 0.1) 40%, rgb(var(--scrim) / 0.55) 100%);
}

.hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: calc(var(--header-h) + var(--space-8)) var(--space-6) var(--space-24);
  max-width: 60rem;
}

.hero__content > :not(h1) {
  animation: hero-rise 1.6s var(--ease-out) both;
  animation-delay: calc(var(--intro-delay) + var(--d, 0s));
}

.hero__content > :nth-child(2) { --d: 0.1s; }
.hero__content > :nth-child(4) { --d: 0.7s; }
.hero__content > :nth-child(5) { --d: 0.85s; }

.hero__word {
  display: inline-block;
  overflow: hidden;
  padding-bottom: 0.08em;
  vertical-align: top;
}

.hero__word + .hero__word {
  margin-left: 0.22em;
}

.hero__char {
  display: inline-block;
  animation: char-rise 1.3s var(--ease-expo) both;
  animation-delay: calc(var(--intro-delay) + 0.15s + var(--c) * 45ms);
}

@keyframes char-rise {
  from {
    transform: translateY(105%);
  }
}

.hero__mark {
  width: 4rem;
  margin-bottom: var(--space-6);
}

.hero__kicker {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  margin: 0 0 var(--space-6);
  padding-left: 0.4em;
}

.hero__title {
  font-size: clamp(3.25rem, 10vw, 8rem);
  font-weight: 300;
  line-height: 0.95;
  letter-spacing: 0.01em;
  color: var(--text-on-dark);
  margin: 0 0 var(--space-6);
}

.hero__subtitle {
  font-family: var(--font-serif);
  font-size: clamp(1.15rem, 2.4vw, 1.6rem);
  font-style: italic;
  font-weight: 300;
  line-height: 1.45;
  max-width: 32rem;
  margin: 0 0 var(--space-12);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  justify-content: center;
}

.hero__scroll {
  animation: hero-rise 1.6s var(--ease-out) both;
  animation-delay: calc(var(--intro-delay) + 1s);
  position: absolute;
  bottom: var(--space-6);
  left: 0;
  right: 0;
  width: max-content;
  margin-inline: auto;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  font-size: 0.625rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text-on-dark);
}

.hero__scroll:hover {
  color: var(--text-on-dark);
}

.hero__scroll-line {
  position: relative;
  width: 1px;
  height: 3.5rem;
  background: rgb(245 241 234 / 0.3);
  overflow: hidden;
}

.hero__scroll-line::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--text-on-dark);
  animation: scroll-line 2.4s var(--ease) infinite;
}

@keyframes hero-zoom {
  from {
    transform: scale(1.12);
  }
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
}

/* As the hero scrolls away the photo drifts slower than the page and the
   content lifts and fades. Scroll-driven, no JS; skipped where unsupported. */
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .hero__media {
      animation: hero-drift linear both;
      animation-timeline: scroll(root);
      animation-range: 0 100vh;
    }

    .hero__content {
      animation: hero-out linear both;
      animation-timeline: scroll(root);
      animation-range: 0 75vh;
    }
  }
}

@keyframes hero-drift {
  to {
    transform: translateY(28%);
  }
}

@keyframes hero-out {
  to {
    opacity: 0;
    transform: translateY(-80px);
  }
}

@keyframes scroll-line {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}

/* Intro */
.intro {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.intro__texture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.35;
  mix-blend-mode: multiply;
  z-index: -1;
}

.intro__inner {
  max-width: 68rem;
}

.intro__title {
  max-width: 20ch;
  margin-bottom: var(--space-16);
}

.intro__title em {
  color: var(--accent);
}

.intro__body {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
}

.intro__lead {
  font-family: var(--font-serif);
  font-size: clamp(1.2rem, 1.8vw, 1.5rem);
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0;
}

.intro__facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin: 0;
  align-self: end;
}

.intro__fact {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-2);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-strong);
}

.intro__fact dd {
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 300;
  line-height: 1;
  color: var(--text);
}

.intro__fact dt {
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* Story */
.story {
  display: grid;
  grid-template-columns: 1fr;
}

.story__media {
  min-height: 60svh;
}

.story__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story__body {
  display: flex;
  align-items: center;
  padding: var(--section-y) clamp(var(--space-6), 6vw, var(--space-24));
}

.story__inner {
  max-width: 34rem;
}

.story__title {
  font-size: clamp(2.25rem, 4.5vw, 3.75rem);
  font-weight: 300;
  margin-bottom: var(--space-8);
}

.story__title em {
  color: var(--gold);
}

.story__text {
  color: var(--text-on-dark-muted);
}

.story__quote {
  margin: var(--space-8) 0 var(--space-12);
  padding-left: var(--space-6);
  border-left: 1px solid var(--gold);
}

.story__quote p {
  margin: 0;
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-style: italic;
  font-weight: 300;
  line-height: 1.5;
}

/* Gallery */
.gallery-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

.gallery-head__title {
  font-size: clamp(2.25rem, 4.5vw, 3.75rem);
  font-weight: 300;
  margin: 0;
}

.gallery-head__links {
  display: flex;
  gap: var(--space-8);
}

.mosaic {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 10rem;
  grid-template-areas:
    'a a'
    'a a'
    'b c'
    'b d'
    'e d'
    'f f';
  gap: var(--space-3);
  list-style: none;
  margin: 0;
  padding: 0;
}

.mosaic__item {
  overflow: hidden;
}

/* Portraits (b, d) take the tall cells, landscapes the wide ones. */
.mosaic__item:nth-child(1) { grid-area: a; }
.mosaic__item:nth-child(2) { grid-area: b; }
.mosaic__item:nth-child(3) { grid-area: c; }
.mosaic__item:nth-child(4) { grid-area: d; }
.mosaic__item:nth-child(5) { grid-area: e; }
.mosaic__item:nth-child(6) { grid-area: f; }

.mosaic__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.4s var(--ease-out);
}

.mosaic__item:hover img {
  transform: scale(1.05);
}

/* Location */
.location {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  align-items: center;
}

.location__media img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.location__title {
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 300;
  margin-bottom: var(--space-8);
}

.location__address {
  font-style: normal;
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  line-height: 1.5;
  margin-bottom: var(--space-8);
}

.location__contact {
  display: grid;
  gap: var(--space-4);
  margin: 0 0 var(--space-12);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-strong);
}

.location__contact dt {
  font-size: var(--text-xs);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--bronze);
}

.location__contact dd {
  margin: 0;
  overflow-wrap: anywhere;
}

.location__contact a {
  text-decoration: none;
}

.location__contact a:hover {
  text-decoration: underline;
}

.location__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

@media (min-width: 720px) {
  .mosaic {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: clamp(12rem, 18vw, 17rem);
    grid-template-areas:
      'a a b c'
      'a a b d'
      'e f f d';
  }
}

@media (min-width: 900px) {
  .intro__body {
    grid-template-columns: 1.3fr 1fr;
    gap: var(--space-16);
  }

  .story {
    grid-template-columns: 1fr 1fr;
    min-height: 100svh;
  }

  .story__media {
    min-height: 0;
  }

  .location {
    grid-template-columns: 1.2fr 1fr;
    gap: clamp(var(--space-12), 7vw, var(--space-24));
  }
}
</style>
