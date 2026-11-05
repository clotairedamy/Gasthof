import type { ComputedRef } from 'vue' // see useMessages.ts
import { rooms, type Room } from '~/content/rooms'
import type { Messages } from '~/content/locales'

export type LocalizedRoom = Room & Messages['rooms']['items'][keyof Messages['rooms']['items']]

/** Room facts (slug, photos) merged with their copy in the active locale. */
export function useRooms(): ComputedRef<LocalizedRoom[]> {
  const t = useMessages()
  return computed(() => rooms.map((room) => ({ ...room, ...t.value.rooms.items[room.slug] })))
}

/** Cover photo and its description; the house itself when a room has no photos yet. */
export function roomCover(room: LocalizedRoom, houseAlt: string): { src: string; alt: string } {
  const src = room.images[0]
  return src ? { src, alt: `${room.name} – ${room.tagline}` } : { src: '/images/hero.jpg', alt: houseAlt }
}
