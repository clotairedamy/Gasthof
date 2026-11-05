export interface GalleryImage {
  src: string
  alt: string
  /** Portrait (3:4) rather than landscape (3:2). */
  tall?: boolean
}

// Photos of the house only. gallery-1…6.jpg in public/images are stock
// textures from the old template and must not be listed here.
export const gallery: GalleryImage[] = [
  { src: '/images/hero.jpg', alt: 'Gasthof Barlida von außen, vor bewaldeten Berghängen' },
  { src: '/images/restaurant-1.jpg', alt: 'Hell eingedeckter Speisesaal im Restaurant Lainacherwirt' },
  { src: '/images/terrace-2.jpg', alt: 'Reiter mit Pferden vor dem Gasthof', tall: true },
  { src: '/images/bar-1.jpg', alt: 'Holzvertäfelte Bar mit Barhockern' },
  { src: '/images/suite-3-1.jpg', alt: 'Schlafzimmer in Suite 3', tall: true },
  { src: '/images/restaurant-4.jpg', alt: 'Gedeckter Frühstückstisch' },
  { src: '/images/zimmer-1-1.jpg', alt: 'Zimmer 1 mit Doppelbett', tall: true },
  { src: '/images/apt-gross-1.jpg', alt: 'Wohnküche im Großen Apartment' },
  { src: '/images/terrace-3.jpg', alt: 'Blumen auf der Terrasse', tall: true },
  { src: '/images/restaurant-3.jpg', alt: 'Gedeckter Tisch im Restaurant' },
  { src: '/images/apt-klein-1.jpg', alt: 'Kleines Apartment', tall: true },
  { src: '/images/bar-3.jpg', alt: 'Bar' },
  { src: '/images/terrace-4.jpg', alt: 'Terrasse', tall: true },
  { src: '/images/about-1.jpg', alt: 'Die Gastgeberfamilie', tall: true },
  { src: '/images/terrace-5.jpg', alt: 'Holzfigur vor dem Brennholzstapel', tall: true },
  { src: '/images/zimmer-2-1.jpg', alt: 'Zimmer 2', tall: true },
]
