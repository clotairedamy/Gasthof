export interface GalleryImage {
  src: string
  /** Portrait (3:4) rather than landscape (3:2). */
  tall?: boolean
}

// Photos of the house only. gallery-1…6.jpg in public/images are stock
// textures from the old template and must not be listed here. Descriptions
// live in content/locales/<lang>.ts under gallery.alts, keyed by src.
export const gallery: GalleryImage[] = [
  { src: '/images/hero.jpg' },
  { src: '/images/restaurant-1.jpg' },
  { src: '/images/terrace-2.jpg', tall: true },
  { src: '/images/bar-1.jpg' },
  { src: '/images/suite-3-1.jpg', tall: true },
  { src: '/images/restaurant-4.jpg' },
  { src: '/images/zimmer-1-1.jpg', tall: true },
  { src: '/images/apt-gross-1.jpg' },
  { src: '/images/terrace-3.jpg', tall: true },
  { src: '/images/restaurant-3.jpg' },
  { src: '/images/apt-klein-1.jpg', tall: true },
  { src: '/images/bar-3.jpg' },
  { src: '/images/terrace-4.jpg', tall: true },
  { src: '/images/about-1.jpg', tall: true },
  { src: '/images/terrace-5.jpg', tall: true },
  { src: '/images/zimmer-2-1.jpg', tall: true },
]
