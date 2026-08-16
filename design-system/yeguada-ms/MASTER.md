# Yeguada MS - Design System

Curated after the `ui-ux-pro-max` search and visual audit of the live page.
This file overrides the generic Liquid Glass result because it conflicts with the supplied brand reference.

## Design read

- Mode: redesign-preserve
- Audience: buyers and breeders of premium Andalusian PRE horses
- Direction: dark cinematic equestrian editorial, Spanish heritage on Russian land
- Design variance: 7
- Motion intensity: 6
- Visual density: 3
- Stack: native HTML, CSS and JavaScript

## Core visual rules

- One dark theme across the whole page.
- Sharp geometry. Cards, buttons, forms and media use zero corner radius.
- One accent only: muted antique gold.
- Photography carries atmosphere. Decoration remains secondary.
- Russian identity appears through landscape, woodland, river, estate and restrained Orthodox architecture.
- Spanish identity appears through PRE anatomy, bridle detail, mane, movement and breeding language.

## Color tokens

| Token | Value | Use |
|---|---:|---|
| `--ink` | `#0a0c0b` | main background |
| `--ink-soft` | `#111410` | elevated dark section |
| `--forest` | `#172019` | secondary surface |
| `--ivory` | `#e8e6df` | primary text |
| `--ivory-muted` | `#c7c5be` | body text |
| `--smoke` | `#a8aaa4` | metadata |
| `--gold` | `#c5a36a` | CTA and brand accent, animated |
| `--gold-deep` | `#9b7844` | lines and subdued ornament, animated |
| `--gold-light` | `#e2c88f` | peak of the glow, one step up |
| `--gold-fixed` | `#c5a36a` | gold that must not move |
| `--gold-deep-fixed` | `#9b7844` | deep gold that must not move |
| `--line-gold` | 42% of `--gold` | hairlines and frames |

Normal body text must meet WCAG AA contrast. Do not use pure black, pure white, neon or multi-color accents.

### Gold is animated. Never write it as a number.

`--gold` and `--gold-deep` breathe: once every `--orn-glint-period` the whole
page swells one step brighter and settles back, so every gold mark on screen
catches the light at the same instant. The keyframe is `gold-breath` and it
drives the tokens themselves, not a list of selectors.

That only holds while new work reads the tokens. Rules:

- Any new gold element takes its color from `var(--gold)`, `var(--gold-deep)`
  or `var(--line-gold)`. It then joins the glow with no extra code.
- Never hardcode `#c5a36a`, `#9b7844` or `rgba(197, 163, 106, …)` in a rule.
  A hardcoded value drops out of the glow and reads as a dull patch next to
  everything else.
- For translucent gold use `color-mix(in srgb, var(--gold) N%, transparent)`,
  not `rgba()` with numbers. Keep the old `rgba()` line directly above it as
  a fallback for browsers without `color-mix`.
- Use `--gold-fixed` only where movement would be a defect: the focus ring,
  text selection, the filled primary button, and light cast over a photo.
- Never add a second per-element glow animation. One light source, one
  keyframe. Extra animations put elements out of step, which is the exact
  thing this system exists to prevent.
- Photos never carry the glow. Their gold frames do.

## Typography

- Display: locally hosted `Cormorant Garamond`, weights 400-600.
- Body and UI: locally hosted `Manrope`, weights 400-600.
- Body minimum: 16px, line-height 1.55-1.75.
- Desktop hero: maximum two lines.
- Labels: 12-14px, restrained tracking, never tiny gray system text.

Serif is intentional here because the product is a heritage luxury equestrian brand with a strong editorial reference.

## Hero

- Use separate desktop and mobile art-directed images.
- Desktop image is full-bleed, never a portrait strip.
- Horse occupies roughly the right 52-56 percent and blends into the frame.
- Left side remains clean enough for live HTML copy.
- Raster contains no text, buttons, logos, seals, badges or navigation.
- Bottom transition fades smoothly into the next section.
- Hero stack: one kicker, one headline, one short paragraph, two CTAs maximum.

## Motion

- No magnetic buttons and no pointer-follow physics.
- Button hover changes color or border in 180-240ms.
- Arrow may move 3-4px without moving the button.
- Hero uses one restrained curtain reveal and slow photographic depth.

### Three motion layers, three properties

Motion is cinematic: long durations, small amplitudes. It should read as weight, not as animation. Three layers run over the same photographs, so each owns a different CSS property and they must not be mixed. Putting two of them on `transform` breaks hover silently, because an animation always overrides a transition on the same property.

| Layer | Property | Mechanism |
|---|---|---|
| Frame reveal | `clip-path` + `opacity` | transition on `.is-visible` |
| Scroll drift | `translate` + `scale` | animation on `view()` |
| Hover | `transform` | transition |

- Text reveal stays opacity and translateY. Photography reveals with a bottom-up `clip-path` wipe over about 1.2s.
- Rows of four frames stagger by roughly 100ms so a row assembles instead of flashing.
- Scroll drift is about 3 percent of height. Frames inside a clipping wrapper need a compensating base `scale`; frames whose own edges are already dissolved by a mask do not, because the drift only shifts the dissolved band.
- Horse cards never drift: `object-fit: contain` on a mount, so movement inside the frame reads as a defect.
- The header progress bar is the Seam. Its motif crossfades from the Spanish lattice to the Russian lozenge as the page scrolls, so ornament reports position between the two lands instead of decorating. Bands crossfade edge to edge, keeping total opacity constant.
- Every scroll-driven effect sits behind `@supports (animation-timeline: ...)` with a static fallback that is never blank.
- Respect `prefers-reduced-motion`. Initial hidden states live inside `prefers-reduced-motion: no-preference`, and a `noscript` block neutralises them, so neither a reduced-motion setting nor a failed script can leave the page empty.
- The breeding section stays in normal document flow and never captures scrolling.
- Breeding facts remain static and fully readable without scroll-triggered animation.
- Horse dialogs open only after the final image crop is ready.
- Navigation exposes the active section and page progress.
- Respect `prefers-reduced-motion`.
- Motion must communicate hierarchy or feedback, never decoration alone.

## Layout

- Desktop shell: maximum 1500px with 6 percent side gutters.
- Breakpoints as actually implemented: 1180, 900, 767 and 390px. The desktop nav collapses at 900.
- No horizontal page scrolling.
- Mobile layouts collapse to one column.
- Breeding media comes before breeding copy and aligns to the section top.
- Repeated split layouts are broken up by grid and full-width media sections. The page must never run more than two split layouts without a full-bleed break between them.
- Section order carries the argument: hero, two lands, farm, cinematic break, horses, breeding, farm life and seasons, buying, contacts.
- The catalogue has no filters. With four horses they read as empty; each horse is opened as a dossier instead.

## Image treatment

- The horse is always shown whole, ears to hooves. Conformation is the product; a cropped hindquarter or a cut tail is a defect, not a crop choice. This outranks filling the frame.
- Standard horse-card canvas: 4:5 with `object-fit: contain` on a mounted plate - a 1px hairline border and a dark panel with padding, read as a catalogue print rather than a letterbox. The earlier blurred self-extension is gone: it was a workaround that read as letterboxing, and `cover` was tried and reverted because it cut the horses.
- Because the mount absorbs any aspect ratio, source photographs do not need matching crops. Keep the dead margin under roughly 25 percent; past that, crop the empty sky and grass out of the source instead of shrinking the horse.
- A missing image renders the ornamental plate from the Seam system, never a broken-image message.
- Section photos may fade into the page at top and bottom, but the subject stays clear.
- Avoid hard image-to-background seams and excessive darkness.
- Apply one muted olive, silver and warm-highlight grade across all photography.
- The breeding hero image shows the full stallion without rider or casual arena clutter.

## Materiality

- Fixed grain is permitted at 2-3 percent opacity only.
- A subtle fixed vignette may deepen the frame on desktop and disappears on mobile.
- Ornament follows the Seam system below. The earlier rule limiting ornament to a single gold line is superseded.

## Ornament: the Seam

The Russian dotted lozenge (the "sown field" motif of spinning-wheel carving) and the Spanish azulejo lattice lozenge are the same figure read two ways. Every ornament on the site derives from that shared primitive, so decoration carries the brand idea instead of sitting on top of it.

Two motif families:

| Russian | Spanish |
|---|---|
| dotted lozenge, sown field | azulejo lattice |
| northern eave tooth | wrought-iron scroll |
| river wave | horseshoe |
| birch tick | radial rosette |

Rules:

- The motif shifts down the page. Seams read Spanish near the hero and Russian by the lower sections. This progression is the narrative, not a decorative accident.
- Stroke weight is 1px. Fill is never used.
- Gold only, drawn from `--gold` and `--gold-deep`. Opacity is governed by `--orn-opacity` (0.5) and `--orn-plate-opacity` (0.05).
- Motifs are implemented as CSS masks over a token-coloured background, so the palette can never drift.
- Seams draw outward from the centre on reveal. The initial clipped state lives inside `prefers-reduced-motion: no-preference`, so ornament stays visible if scripting fails.
- No ornament carpets. Repeating bands are confined to section seams and the footer frieze; the rosette appears only as a low-opacity plate behind a quote and as the map marker.
- If the page ever reads folkloric, lower `--orn-opacity` and drop the rosette plates before touching the seams.

## Two-land grade

The duality is carried by temperature, not by subject matter. Spanish frames are warmer and drier, Russian frames cooler and damper, both inside one muted palette.

This split lives in the photography, not in CSS. Shots are commissioned already graded, so the section filters only unify them and are deliberately weak. Do not strengthen them to "fix" a frame that arrives ungraded: regrade the frame instead, or it will drift away from the rest of the page.

Two consequences worth keeping:

- `.diptych-panel--es` carries only a trace of sepia. The Spanish plate already sits around +31 on the red-minus-blue axis; more sepia turns it orange.
- `.season-frame img` carries no sepia at all. The four seasonal frames run a temperature arc from warm spring to cold winter, and a uniform sepia would flatten that arc and tint the snow.

Reference values for replacement frames are recorded in `ASSET_PROMPTS.md`.

## Content rules

- No internal production notes in visible copy.
- No phrases such as temporary AI image, confirm before publication or add later.
- No external studbook/profile links from the one-page conversion path.
- No em dash or en dash characters. Use the regular hyphen.
- Keep one clear copy register: calm, factual, premium.

## Pre-delivery checks

- Hero visually checked at 1440x900 and 390x844.
- CTA labels remain on one line.
- Interactive targets are at least 44px high.
- Focus states remain visible.
- Reduced motion works.
- No horizontal overflow on mobile.
- Every image loads and has reserved dimensions.
- All visible strings have been reviewed for internal notes and placeholders.
