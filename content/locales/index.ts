import { de, type Messages } from './de'
import { en } from './en'
import { it } from './it'
import { nl } from './nl'
import { ro } from './ro'

export type { Messages }

// Order is the order of the language switcher. German is the default and
// lives at the root; the others are prefixed (/en/, /it/, …).
export const locales = [
  { code: 'de', language: 'de-AT', name: 'Deutsch' },
  { code: 'en', language: 'en', name: 'English' },
  { code: 'it', language: 'it', name: 'Italiano' },
  { code: 'nl', language: 'nl', name: 'Nederlands' },
  { code: 'ro', language: 'ro', name: 'Română' },
] as const

export type LocaleCode = (typeof locales)[number]['code']

export const messages: Record<LocaleCode, Messages> = { de, en, it, nl, ro }
