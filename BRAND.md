# Gasthof Barlida — Brand & design tokens

Single source of truth: `assets/css/tokens.css`.

## Palette (by role)

| Token | Value | Use |
| --- | --- | --- |
| `--canvas` | `#f5f1ea` | page background (warm ivory) |
| `--surface` | `#fbf9f5` | raised surfaces |
| `--surface-2` | `#ebe4d8` | alternating section background (sand) |
| `--ink` | `#16201b` | dark sections, footer, menu (forest at night) |
| `--text-on-dark` | `#f5f1ea` | text on `--ink` and on photos behind a scrim |
| `--text-on-dark-muted` | `#d9cfbf` | secondary text on `--ink` |
| `--text` | `#1f1a15` | body text |
| `--text-muted` | `#5b5248` | secondary text |
| `--text-subtle` | `#6d6355` | tertiary text |
| `--border` | `#e2dacb` | hairlines |
| `--accent` | `#2f4a3a` | deep alpine evergreen — the single accent |
| `--accent-text` | `#f5f1ea` | text on accent |
| `--bronze` | `#7d5f36` | kicker/eyebrow text on light surfaces |
| `--gold` | `#c9a978` | kicker text and details on `--ink` |
| `--focus` | `#1d6b4c` | focus ring on light surfaces |
| `--focus-on-dark` | `#c9a978` | focus ring inside `.on-dark` |

## Contrast (measured, WCAG 2.2)

| Foreground | Background | Ratio | Req | Pass |
| --- | --- | --- | --- | --- |
| `--text` | `--canvas` | 15.33 | 4.5 | ✓ |
| `--text` | `--surface` | 16.41 | 4.5 | ✓ |
| `--text-muted` | `--canvas` | 6.79 | 4.5 | ✓ |
| `--text-muted` | `--surface-2` | 6.05 | 4.5 | ✓ |
| `--bronze` | `--canvas` | 5.24 | 4.5 | ✓ |
| `--bronze` | `--surface-2` | 4.67 | 4.5 | ✓ |
| `--accent-text` | `--accent` | 8.63 | 4.5 | ✓ |
| `--text-on-dark` | `--ink` | 14.84 | 4.5 | ✓ |
| `--text-on-dark-muted` | `--ink` | 10.85 | 4.5 | ✓ |
| `--gold` | `--ink` | 7.50 | 4.5 | ✓ |
| `--focus` | `--canvas` | 5.72 | 3.0 | ✓ |
| `--focus-on-dark` | `--ink` | 7.50 | 3.0 | ✓ |

`--text-subtle` is not used for body copy below 19px; verify before using it on
small text.

## Type

- **Serif display:** Cormorant Garamond (headings) — `--font-serif`
- **Sans:** Jost (body/UI, tracked uppercase labels) — `--font-sans`
- Serif headings run light (300) with italic accents (`<em>`).
- Body floor 16px, line-height 1.6. Headings 1.1.

## Rules

- One accent (evergreen). Bronze/gold mark labels, never actions.
- Square corners; buttons are tracked uppercase, not pills.
- Use tokens, never raw hex, outside `tokens.css`.
- Focus ring `:focus-visible` everywhere; never `outline: none` without a replacement.
- `prefers-reduced-motion` collapses all transitions/animations: no intro
  curtain, reveals, parallax, marquee or cursor follower.
- Motion: `v-reveal` (fade up), `v-reveal:image` (curtain wipe), `v-split`
  (words rise). Nothing is hidden without JavaScript.
