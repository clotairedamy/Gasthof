// Facts about each room. Names, descriptions and features are copy and live
// in content/locales/<lang>.ts under rooms.items[slug].

export interface Room {
  slug: RoomSlug
  /** Photos of this room only. Empty until real photos exist. */
  images: string[]
}

export type RoomSlug = 'zimmer-1' | 'zimmer-2' | 'suite-3' | 'suite-4' | 'kleine-apartment' | 'grosse-apartment'

export const rooms: Room[] = [
  { slug: 'zimmer-1', images: ['/images/zimmer-1-1.jpg', '/images/zimmer-1-2.jpg', '/images/zimmer-1-3.jpg'] },
  { slug: 'zimmer-2', images: ['/images/zimmer-2-1.jpg', '/images/zimmer-2-2.jpg', '/images/zimmer-2-3.jpg', '/images/zimmer-2-4.jpg'] },
  { slug: 'suite-3', images: ['/images/suite-3-1.jpg', '/images/suite-3-2.jpg', '/images/suite-3-3.jpg', '/images/suite-3-4.jpg'] },
  // No photos of Suite 4 yet. rooms-hero.jpg is a family photo and
  // gallery-*.jpg are stock textures, so neither may stand in.
  { slug: 'suite-4', images: [] },
  { slug: 'kleine-apartment', images: ['/images/apt-klein-1.jpg', '/images/apt-klein-2.jpg', '/images/apt-klein-3.jpg', '/images/apt-klein-4.jpg', '/images/apt-klein-5.jpg', '/images/apt-klein-6.jpg'] },
  { slug: 'grosse-apartment', images: ['/images/apt-gross-1.jpg', '/images/apt-gross-2.jpg', '/images/apt-gross-3.jpg', '/images/apt-gross-4.jpg', '/images/apt-gross-5.jpg', '/images/apt-gross-6.jpg'] },
]
