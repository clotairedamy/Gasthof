// Restaurant facts. Copy lives in content/locales/<lang>.ts under restaurant.

export const restaurantImages = [
  '/images/restaurant-1.jpg',
  '/images/restaurant-2.jpg',
  '/images/restaurant-3.jpg',
  '/images/restaurant-4.jpg',
  '/images/restaurant-5.jpg',
  '/images/restaurant-6.jpg',
]

/** Restaurant / bar / terrace, in the order of restaurant.highlights in each locale. */
export const highlightFacts = [
  { image: '/images/restaurant-1.jpg', to: '/restaurant' },
  { image: '/images/bar-1.jpg', to: '/restaurant' },
  { image: '/images/terrace-1.jpg', to: '/restaurant' },
]

export interface Highlight {
  title: string
  text: string
  image: string
  to: string
}
