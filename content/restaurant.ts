export interface Highlight {
  title: string
  text: string
  image: string
  to: string
}

export const restaurant = {
  name: 'Restaurant Lainacherwirt',
  intro: 'Hier entstehen Geschichten – bei einem guten Glas und herzlicher Gastfreundschaft.',
  description: [
    'Das Restaurant Lainacherwirt bietet rund 50 Sitzplätze im Innenbereich sowie eine ruhige Terrasse vor dem Gasthof mit 20 weiteren Plätzen. Es befindet sich im Erdgeschoss und ist während der Sommersaison von Juni bis Mitte September geöffnet.',
    'Hier genießen Sie Frühstück, Mittag- und Abendessen – mit einer Auswahl an traditionellen und internationalen Gerichten.',
  ],
  offSeason:
    'Außerhalb der Saison profitieren unsere Gäste von einer kleineren Speisekarte oder – für Gruppen ab 10 Personen – von einem Buffet.',
  events: {
    title: 'Feiern & Veranstaltungen',
    text: 'In unserem Haus können Sie besondere Anlässe wie Geburtstage, Familientreffen oder andere Feste in gemütlicher, einladender Atmosphäre feiern. Wir bieten persönliche Menügestaltung, freundlichen Service und auf Wunsch festliche Dekoration.',
  },
  hours: [
    { label: 'Sommersaison', value: 'Juni – Mitte September' },
    { label: 'Frühstück', value: 'Auf Anfrage' },
    { label: 'Mittagessen', value: 'In der Saison' },
    { label: 'Abendessen', value: 'In der Saison' },
  ],
  images: [
    '/images/restaurant-1.jpg',
    '/images/restaurant-2.jpg',
    '/images/restaurant-3.jpg',
    '/images/restaurant-4.jpg',
    '/images/restaurant-5.jpg',
    '/images/restaurant-6.jpg',
  ],
}

export const highlights: Highlight[] = [
  {
    title: 'Restaurant',
    text: 'Rund 50 Plätze, helle Tische und eine Küche, die Tradition und Welt verbindet – vom ersten Kaffee am Morgen bis zum Abendessen.',
    image: '/images/restaurant-1.jpg',
    to: '/restaurant',
  },
  {
    title: 'Bar',
    text: 'Holz, warmes Licht und ein gutes Glas. Hier entstehen Geschichten – und manchmal Freundschaften.',
    image: '/images/bar-1.jpg',
    to: '/restaurant',
  },
  {
    title: 'Terrasse',
    text: '20 Plätze unter freiem Himmel, Blumen am Geländer und die Berge im Blick. Sommer, wie er sein soll.',
    image: '/images/terrace-1.jpg',
    to: '/restaurant',
  },
]
