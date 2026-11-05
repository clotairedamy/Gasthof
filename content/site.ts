import type { Messages } from './locales'

export interface NavItem {
  key: keyof Messages['nav']
  to: string
}

export const site = {
  name: 'Gasthof Barlida',
  subName: 'Lainacherwirt',
  legalName: 'Gasthof Barlida – Lainacherwirt',

  phone: '+43 690 10051909',
  phoneHref: 'tel:+4369010051909',
  email: 'codruta_coco@yahoo.com',
  emailHref: 'mailto:codruta_coco@yahoo.com',
  street: 'Lainach 80',
  postalCode: '9833',
  locality: 'Rangersdorf',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lainach+80+9833+Rangersdorf+Austria',

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=100057572494597',
    instagram: 'https://www.instagram.com/pension_gasthof_barlida/',
  },
}

export const nav: NavItem[] = [
  { key: 'rooms', to: '/zimmer' },
  { key: 'restaurant', to: '/restaurant' },
  { key: 'about', to: '/ueber-uns' },
  { key: 'gallery', to: '/galerie' },
  { key: 'contact', to: '/kontakt' },
]
