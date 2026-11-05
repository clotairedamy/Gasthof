// Imported explicitly: the auto-imported ComputedRef type resolved to `any`
// here and silently untyped every caller.
import type { ComputedRef } from 'vue'
import { messages, type LocaleCode, type Messages } from '~/content/locales'

/** Copy for the active locale. Top-level refs unwrap in templates: `t.home.heroRooms`. */
export function useMessages(): ComputedRef<Messages> {
  const { locale } = useI18n()
  return computed(() => messages[locale.value as LocaleCode] ?? messages.de)
}

/** Description of a gallery photo in the active locale ('' if none). */
export function useGalleryAlt(): (src: string) => string {
  const t = useMessages()
  return (src) => t.value.gallery.alts[src as keyof Messages['gallery']['alts']] ?? ''
}
