export interface NavItem {
  label: string
  to: string
}

export const site = {
  name: 'Gasthof Barlida',
  subName: 'Lainacherwirt',
  legalName: 'Gasthof Barlida – Lainacherwirt',
  tagline: 'Authentisches Alpenerlebnis',
  region: 'Zwischen Mölltal-Gletscher und Großglockner',

  phone: '+43 690 10051909',
  phoneHref: 'tel:+4369010051909',
  email: 'codruta_coco@yahoo.com',
  emailHref: 'mailto:codruta_coco@yahoo.com',
  address: 'Lainach 80, 9833 Rangersdorf, Österreich',
  addressShort: 'Lainach 80 · 9833 Rangersdorf',

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=100057572494597',
    instagram: 'https://www.instagram.com/pension_gasthof_barlida/',
  },
}

export const nav: NavItem[] = [
  { label: 'Zimmer', to: '/zimmer' },
  { label: 'Restaurant', to: '/restaurant' },
  { label: 'Über uns', to: '/ueber-uns' },
  { label: 'Galerie', to: '/galerie' },
  { label: 'Kontakt', to: '/kontakt' },
]

// The scrolling strip under the home hero.
export const promises: string[] = [
  'Familiengeführt',
  'Mitten in den österreichischen Alpen',
  'Restaurant, Hausbar & Terrasse',
  'Zwischen Mölltal-Gletscher und Großglockner',
  'Nahe den Lienzer Dolomiten',
  'Direkt beim Gastgeber anfragen',
]
