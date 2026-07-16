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
| `--gold` | `#c5a36a` | CTA and brand accent |
| `--gold-deep` | `#9b7844` | lines and subdued ornament |

Normal body text must meet WCAG AA contrast. Do not use pure black, pure white, neon or multi-color accents.

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
- Scroll reveal uses only opacity and translateY.
- Hero uses one restrained curtain reveal and slow photographic depth.
- The breeding section stays in normal document flow and never captures scrolling.
- Breeding facts remain static and fully readable without scroll-triggered animation.
- Horse dialogs open only after the final image crop is ready.
- Navigation exposes the active section and page progress.
- Respect `prefers-reduced-motion`.
- Motion must communicate hierarchy or feedback, never decoration alone.

## Layout

- Desktop shell: maximum 1500px with 6 percent side gutters.
- Breakpoints: 375, 768, 1024 and 1440px.
- No horizontal page scrolling.
- Mobile layouts collapse to one column.
- Horse filters wrap or use a two-column grid on mobile.
- Breeding media comes before breeding copy and aligns to the section top.
- Repeated split layouts are broken up by grid and full-width media sections.

## Image treatment

- Show the full horse whenever identity or conformation matters.
- Standard horse-card canvas: 4:5.
- Fill unused card space with a soft blurred extension of the same photograph, never plain black bars.
- Section photos may fade into the page at top and bottom, but the subject stays clear.
- Avoid hard image-to-background seams and excessive darkness.
- Apply one muted olive, silver and warm-highlight grade across all photography.
- The breeding hero image shows the full stallion without rider or casual arena clutter.

## Materiality

- Fixed grain is permitted at 2-3 percent opacity only.
- A subtle fixed vignette may deepen the frame on desktop and disappears on mobile.
- Russian plant ornament appears once as a restrained gold line, never as a repeated theme.

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
