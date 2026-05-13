# Session Log — May 13, 2026

**Project:** Faloe Foundry Site (`faloefoundry.com`)
**Stack:** Astro v6 · Tailwind CSS v4 · GitHub Pages
**Session context:** Continued from a previous session (context limit). This log covers work done on May 13 only.

---

## Files Modified

### `src/pages/index.astro`
Primary working file. All changes listed below.

### `src/pages/workshops/beyond-do-it-again.astro`
New file. Created from scratch.

### `public/genoa-set-cafe.jpeg`
New file. Added by user upload, saved to `public/`.

### `public/genoa-monitor.jpeg`
New file. Added by user upload, saved to `public/`.

### `public/genoa-wrap.jpeg`
New file. Added by user upload (filename had a double-dot `genoa-wrap..jpeg`, corrected on save).

### `public/founder-portrait.jpeg`
New file. Added by user upload, saved to `public/`.

---

## Changes to `index.astro`

### Image swaps
- Foundry section: `foundry-new-york.jpeg` → `genoa-set-cafe.jpeg`, alt updated to "On set in Genoa, February 2026."
- Founder section: `founder-on-set.jpeg` → `founder-portrait.jpeg`, alt updated to "Jonathan Whittaker | New York."

### Sections added
- **Proof section** inserted between Studio and Founder sections. Contains:
  - `genoa-monitor.jpeg` full-width (16/9, B&W filter)
  - Copy block: Rajasthan → Genoa → feature-in-development story
  - `genoa-wrap.jpeg` full-width below copy (same filter)

### Sections deleted
- `#philosophy` (Technology Philosophy / Human Tradition) — entire section removed
- `#manifesto` (Manifesto) — entire section removed, including its `::after` grain CSS and `z-index` rules

### Nav
- Manifesto link removed

### Image treatment — all images
Old: `filter: grayscale(90%) sepia(50%) brightness(0.62) contrast(1.06)`
New: `filter: grayscale(100%) brightness(0.75) contrast(1.08)`
All amber multiply overlay divs (`rgba(155, 105, 40, 0.18)`) removed.

### Founder portrait specifically
Old: `filter: grayscale(90%) sepia(50%) brightness(0.62) contrast(1.06)`
New: `filter: grayscale(100%) brightness(0.75) contrast(1.08)` (no sepia — the image is already B&W)

### Image crop positions adjusted
- `genoa-set-cafe.jpeg`: `object-position: center center`
- `genoa-monitor.jpeg`: `object-position: center 60%`
- `founder-portrait.jpeg`: `object-position: center 20%`
- `genoa-wrap.jpeg`: `object-position: center 30%` (unchanged from initial set)

### Founder signature
- Old: `— J.W.`
- Changed to: `— J.R.W.`
- Changed to: `— jrw` (final)
- Proof section signature removed (signature appears only in Founder section)

### Gold accent color — full history
| From | To | When |
|---|---|---|
| `#b8956a` (sepia) | `#9a7a50` | Earlier session |
| `#9a7a50` | `#C0A050` | Earlier session |
| `#C0A050` | `#D4A017` | This session |
| `#D4A017` | `#B8963E` | This session (final) |

**Final gold value: `#B8963E`**

Applied to:
- Hero italic span ("down by hand.")
- Hero divider bar (horizontal rule left of hero body text)
- All uppercase section eyebrow labels (all tracking variants)
- Submit button background
- `— jrw` signature in Founder section
- "A Film. Not Content." in footer

### Footer
- All footer text opacity raised from 0.3–0.4 to 0.6
- Copyright row: `text-[10px]` → `text-[13px]`
- In Network paragraph: `text-[10px]` → `text-[13px]`
- "A Film. Not Content." maker's mark added (bottom-right of footer), Cormorant Garamond italic, `#B8963E`

### Global legibility pass
All text below 12px raised to 12px. All opacity below 0.5 raised to 0.6 minimum. Affected elements:
- Hero eyebrow, hero film annotation (`[ 1.85:1 / 24fps / New York ]`)
- All pillar sub-labels (I / II / III)
- All section eyebrows (Foundry, Field, Studio, Contact)
- "Also Under the Foundry Umbrella"
- Field bracket markers `[01]` `[02]` `[03]`
- Field phase sub-headers
- All CTA links
- Submit button
- Founder dateline

### Text changes — copy pass

| Old | New |
|---|---|
| `High-impact intensives and bespoke training programs for working filmmakers.` | `Intensives and targeted training programs for working filmmakers.` |
| `Bespoke Workshops` | `Custom Workshops` |
| `INQUIRE ABOUT BESPOKE TRAINING` | `INQUIRE ABOUT CUSTOM TRAINING` |
| `high-impact intensives built around` | `intensives built around` |
| `hold it to a professional cinematic standard` | `hold it to a standard worth putting in a portfolio` |
| `Elite cinematic training at professional standards` | `Training that produces footage worth showing` |
| `A tangible portfolio of high-end original footage` | `A portfolio of original footage, yours to own` |
| `seeking goal-specific cinematic output and professional mentorship` | `seeking finished work they can actually use` |
| `Bespoke commercial and branded content` | `Commercial and branded work` |
| Custom Workshops paragraph (long) | `Custom workshops and training modules for corporations, NGOs, non-profits, and institutions. Built around your goals, in direct consultation with the founder.` |
| `You leave with a film.` (Pillars + Field) | `You leave with a micro-documentary or a series of finished scenes.` |

### LEARN MORE link
Added in Foundry section after cohort note, before Custom Workshops sub-section. Links to `/workshops/beyond-do-it-again`. Styled to match the existing INQUIRE ABOUT CUSTOM TRAINING underline link.

---

## New file: `src/pages/workshops/beyond-do-it-again.astro`

**URL:** `/workshops/beyond-do-it-again`
**Title:** "Beyond Do It Again — Faloe Foundry"

### Page structure (top to bottom)

| Section | Notes |
|---|---|
| Nav | Faloe wordmark → `/`, right label "Foundry · Workshop" (not a link) |
| Hero | Eyebrow, large serif title, italic subtitle, 2-paragraph body |
| The Work | 3-paragraph body prose |
| Who This Is For | 2-paragraph body prose |
| The Curriculum | `[I]` `[II]` `[III]` `[IV + V]` bracket rows, serif item titles |
| What You Leave With | Single paragraph |
| The Details | 2-col grid (mobile: 1-col): Schedule, Time, Format, Investment |
| The Teacher | Large Cormorant Garamond quote + `#1e1e1e` bordered archive note |
| CTA | Italic muted warning, gold outline button → `mailto:hello@faloefoundry.com` |
| Footer | Identical to main site footer |

### Design tokens used
- Gold: `#B8963E`
- Background: `#000000`
- Primary text: `#fdfcf8`
- Muted text: `#c8c5bc`
- Section borders: `1px solid #1e1e1e`
- Fonts: Cormorant Garamond (headings, quotes, prices) · Inter (body, labels)

### Pricing display
`$450` and `$575` in Cormorant Garamond at `clamp(2rem, 4vw, 3rem)`, with "First six spots" / "Remaining spots" in 13px Inter beside each figure.

### CTA button
Gold outline style (`border: 1px solid #B8963E; color: #B8963E`). On hover: gold fill, `#0c0a07` text. CSS transition 0.3s. Respects `prefers-reduced-motion`.

---

## Infrastructure

### SEO / Sitemap
Sitemap auto-generated by `@astrojs/sitemap`. New workshop page is included automatically. Submitted to Google Search Console in a prior session.

### Deployment
GitHub Pages via GitHub Actions. Custom domain `faloefoundry.com`. SSH key `~/.ssh/id_ed25519_jrwhittaker`. Canonical URL: `https://faloefoundry.com` (no www).

### Git commits this session (in order)
1. `Proof section, Genoa images, portrait swap, remove philosophy + manifesto`
2. `Add Genoa + portrait images, second wrap image in proof section`
3. `Adjust image crop positions for Genoa and founder portrait`
4. `Three corrections: portrait filter, copy update, footer maker's mark`
5. `Four corrections: signatures, footer sizing, small text audit`
6. `Founder signature: J.R.W. → jrw`
7. `B&W images, metallic gold accent #C0A050`
8. `Gold accent #D4A017 across all targeted elements`
9. `Gold → #B8963E, copy edits, new Beyond Do It Again workshop page`

---

## Current color palette

| Token | Value | Usage |
|---|---|---|
| Black | `#000000` | Page background |
| Near-black | `#0c0a07` | CTA button text |
| Gold | `#B8963E` | Accent: labels, signature, hero bar, footer mark, CTA |
| Muted cream | `#c8c5bc` | Body text, muted elements |
| Primary cream | `#fdfcf8` | Headlines, primary text, borders |
| Dark border | `#1e1e1e` | Workshop page section separators |

---

## Pending / owner action items
- Obtain model releases for people visible in `genoa-set-cafe.jpeg` and `genoa-wrap.jpeg`
- Confirm actual session dates for Beyond Do It Again (June 15 / 22 / 29, July 7 / 8)
- Set up email routing for `hello@faloefoundry.com` (used in workshop CTA mailto)
- Update roadmap form handler to wire to a real email capture service (currently front-end only, no backend)
