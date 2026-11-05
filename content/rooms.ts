export interface Room {
  slug: string
  name: string
  tagline: string
  description: string[]
  features: string[]
  images: string[]
  highlight?: string
}

export const rooms: Room[] = [
  {
    slug: 'zimmer-1',
    name: 'Zimmer 1',
    tagline: 'Doppelzimmer mit Balkon',
    description: [
      'Dieses Zimmer ist mit einem Doppelbett ausgestattet, das bei Bedarf in zwei Einzelbetten umgewandelt werden kann – für mehr Flexibilität und Komfort.',
      'Zu den Annehmlichkeiten gehören ein TV, ein Kühlschrank, ein Schreibtisch und ein modernes Badezimmer mit Dusche. Der geräumige Balkon ist ideal zum Entspannen.',
    ],
    features: ['Doppelbett (teilbar)', 'TV', 'Kühlschrank', 'Schreibtisch', 'Badezimmer mit Dusche', 'Balkon'],
    images: ['/images/zimmer-1-1.jpg', '/images/zimmer-1-2.jpg', '/images/zimmer-1-3.jpg'],
  },
  {
    slug: 'zimmer-2',
    name: 'Zimmer 2',
    tagline: 'Gemütliches Doppelzimmer',
    description: [
      'Ein gemütliches Zimmer mit Doppelbett, das sich bei Bedarf in zwei Einzelbetten umwandeln lässt.',
      'TV, Kühlschrank, Schreibtisch und ein modernes Badezimmer mit Dusche sorgen für einen komfortablen Aufenthalt. Vom Balkon genießen Sie frische Bergluft und Ruhe.',
    ],
    features: ['Doppelbett (teilbar)', 'TV', 'Kühlschrank', 'Schreibtisch', 'Badezimmer mit Dusche', 'Balkon'],
    images: ['/images/zimmer-2-1.jpg', '/images/zimmer-2-2.jpg', '/images/zimmer-2-3.jpg', '/images/zimmer-2-4.jpg'],
  },
  {
    slug: 'suite-3',
    name: 'Suite 3',
    tagline: 'Zwei Schlafzimmer mit gemeinsamer Küche',
    highlight: 'Ideal für Familien',
    description: [
      'Hier profitieren Sie von zwei Schlafzimmern, die durch einen Flur getrennt sind. Jedes Zimmer verfügt über ein Doppelbett (160/200 bzw. 180/200) und einen Fernseher sowie einen gemeinsamen Balkon.',
      'Eines der Zimmer ist zusätzlich mit einem Kühlschrank mit kleinem Gefrierfach ausgestattet. Das Badezimmer ist gemeinsam und befindet sich in einem der Zimmer.',
      'Im Hauptflur steht eine ausgestattete Küche zur Verfügung – ideal für alle Gäste, die gerne selbst kochen.',
    ],
    features: ['2 Schlafzimmer', 'Doppelbetten (160/200 & 180/200)', 'TV in beiden Zimmern', 'Gemeinsamer Balkon', 'Kühlschrank mit Gefrierfach', 'Gemeinschaftsküche'],
    images: ['/images/suite-3-1.jpg', '/images/suite-3-2.jpg', '/images/suite-3-3.jpg', '/images/suite-3-4.jpg'],
  },
  {
    slug: 'suite-4',
    name: 'Suite 4',
    tagline: 'Helle Suite im ersten Stock',
    highlight: 'Ideal für Familien & Gruppen',
    description: [
      'Helle und einladende Suite im ersten Stock, ideal für Familien oder Freundesgruppen. Die Unterkunft besteht aus zwei separaten Schlafzimmern, die durch einen praktischen Flur miteinander verbunden sind – für Komfort und Privatsphäre.',
      'Jedes Zimmer verfügt über ein großes Doppelbett (160×200 cm und 180×200 cm) sowie einen Fernseher. Eines der Zimmer ist zusätzlich mit einem Kühlschrank und einem modern renovierten Badezimmer mit Dusche und WC ausgestattet.',
    ],
    features: ['2 Schlafzimmer', 'Doppelbetten (160×200 & 180×200)', 'TV', 'Kühlschrank', 'Renoviertes Badezimmer', '1. Stock'],
    images: ['/images/rooms-hero.jpg', '/images/gallery-1.jpg', '/images/gallery-2.jpg'],
  },
  {
    slug: 'kleine-apartment',
    name: 'Kleine Apartment',
    tagline: 'Kompakter Rückzugsort für längere Aufenthalte',
    description: [
      'Unser Kleines Apartment ist der ideale Rückzugsort für Gäste, die länger bleiben möchten.',
      'Mit gemütlichem Wohn- und Schlafbereich sowie Zugang zur voll ausgestatteten Gemeinschaftsküche auf der Etage genießen Sie maximale Freiheit und Unabhängigkeit.',
    ],
    features: ['Wohn- & Schlafbereich', 'Zugang zur Gemeinschaftsküche', 'Badezimmer', 'Gemütliche Atmosphäre'],
    images: ['/images/apt-klein-1.jpg', '/images/apt-klein-2.jpg', '/images/apt-klein-3.jpg', '/images/apt-klein-4.jpg', '/images/apt-klein-5.jpg', '/images/apt-klein-6.jpg'],
  },
  {
    slug: 'grosse-apartment',
    name: 'Große Apartment',
    tagline: 'Viel Platz für Familien und Gruppen',
    highlight: 'Am geräumigsten',
    description: [
      'Das Große Apartment bietet reichlich Platz für Familien und Gruppen, die gemeinsam die Alpen erleben möchten.',
      'Mehrere Schlafbereiche, ein großzügiger Aufenthaltsbereich und der Zugang zur voll ausgestatteten Gemeinschaftsküche machen es perfekt für einen längeren Aufenthalt in den Bergen.',
    ],
    features: ['Mehrere Schlafbereiche', 'Großer Aufenthaltsbereich', 'Zugang zur Gemeinschaftsküche', 'Badezimmer', 'Familienfreundlich'],
    images: ['/images/apt-gross-1.jpg', '/images/apt-gross-2.jpg', '/images/apt-gross-3.jpg', '/images/apt-gross-4.jpg', '/images/apt-gross-5.jpg', '/images/apt-gross-6.jpg'],
  },
]

export function getRoom(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug)
}
