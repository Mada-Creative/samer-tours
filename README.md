# Samer Abu Mock — Travel Agency Website

A bilingual (Arabic / English) static website for a tours & travel agency.
Arabic is the default language (RTL); visitors can switch to English (LTR)
with the language toggle in the header — the choice is remembered per
visitor (localStorage). Numbers are written with Western digits
(1, 2, 3...) in both languages, per the client's request.

No build step, no framework, no dependencies. Plain HTML, CSS and
vanilla JavaScript — open the folder in any static web host and it works.

## Pages

- `index.html` — Home: hero (with Samer's photo), agency story, featured
  destinations, why choose us, a call-to-action banner, and a "call me
  back" contact section (name + phone + optional message, plus a
  WhatsApp button) right before the footer.
- `destinations.html` — All 25 destinations, grouped into 7 regions,
  each as a photo card linking to its own detail page.
- `destination.html?id=<id>` — One page per destination (template-driven,
  not 25 separate files): full-bleed hero photo, description, a
  6-photo gallery of its top attractions (click any photo for a
  full-size lightbox view), hotels Samer has stayed at (only shown
  once provided — see below), and a "Book this destination" button.
- `booking.html` — The trip request form (see below).

## Structure

```
samer-tours/
├── index.html
├── destinations.html
├── destination.html              ← single-destination template page (?id=madrid etc.)
├── booking.html
├── README.md
└── assets/
    ├── css/style.css              ← all styling (design tokens at the top)
    ├── img/                       ← Samer's hero photo lives here
    └── js/
        ├── i18n.js                 ← Arabic/English text dictionary + language switcher
        ├── config.js                ← the one place to set the form's email endpoint
        ├── main.js                  ← shared UI (mobile nav, header shrink-on-scroll, scroll reveal)
        ├── destinations-data.js     ← destination list, regions, hero photos, hotels, colors
        ├── destinations-gallery.js  ← the 6-photo gallery per destination (attraction photos)
        ├── render-destinations.js   ← builds destination cards / detail page / gallery lightbox / booking dropdown
        ├── booking.js                ← booking form logic (trip type, honeymoon quiz, validation, submit)
        └── contact-form.js           ← homepage "call me back" form logic
```

## 1. Editing text / translations

All visible text lives in **`assets/js/i18n.js`**, in two objects: `ar`
and `en`. Every piece of text in the HTML has a `data-i18n="key"`
attribute — to change a sentence, find its key in `i18n.js` and edit the
Arabic and/or English value.

## 2. Contact details — already set, double-check before launch

- **Phone / WhatsApp:** `+972 54-744-8028` — used in the footer, the
  booking sidebar, the floating WhatsApp button on every page, and the
  homepage contact section.
- **Address:** shows "Germany" (no specific city given). To change it,
  edit `footer_address_value` in `i18n.js`.
- **Email:** still a placeholder (`info@samertours.example`) — search
  for it in `i18n.js` and in the `mailto:` links and replace it.
- **Instagram:** linked to `instagram.com/samer315`. There's no
  Facebook link (he doesn't have a page), so that icon was removed.

## 3. Making the forms actually send an email — and testing with your own address

Both the booking form and the new homepage "call me back" form post to
**one shared endpoint**, set in **`assets/js/config.js`**:

```js
window.SAMER_FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```

It's still a placeholder. Formspree retired the old "POST straight to
an email, no signup" trick in 2024, so getting a real endpoint now
needs a **free** account (no credit card):

1. Go to [formspree.io](https://formspree.io) and sign up — you can use
   `tareq.salame@gmail.com` to try the whole flow yourself first.
2. Create a new form; Formspree gives you an endpoint like
   `https://formspree.io/f/xxxxabcd`.
3. Paste that over the placeholder in `config.js`.
4. Submit a form once for real — Formspree emails a one-time
   confirmation link to that inbox first; after it's clicked, every
   submission (booking requests and contact requests) lands there.

**Before going live**, swap the endpoint to Samer's own
Formspree account/email.

## 4. Samer's hero photo

Already in place at `assets/img/samer-hero.jpg`, shown on the homepage
hero. To swap it, just replace that file (same name). If it's ever
missing, the page shows a placeholder instead of a broken image.

## 5. Destination photos & attribution

Every destination has a real hero photo (e.g. Puerta del Sol for
Madrid) **plus a 6-photo gallery**, one per named attraction (the Duomo,
Galleria Vittorio Emanuele, Sforza Castle, etc. for Milan) — 150 photos
in total, all sourced from **Wikimedia Commons** under free licenses
(CC BY / CC BY-SA / CC0 — mixed per photo). Credit + license + source
link are shown under the description on each destination's page (hero
photo) and inside the gallery lightbox (each gallery photo), which
satisfies the license's attribution requirement.

These were matched automatically by attraction name, so a couple may be
a slightly imperfect pick (an interior shot instead of an exterior, for
instance) — worth a quick skim before commercial launch. Before then,
also consider swapping some for Samer's own trip photos: hero photos
live in `heroImage` per destination in `assets/js/destinations-data.js`;
gallery photos live in `assets/js/destinations-gallery.js` (one array
per destination, keyed to `attr_1`..`attr_6`).

## 6. Adding / editing destinations

Each destination's text lives in `i18n.js` (`dest_<id>_*` keys, now 6
attractions per destination — `attr_1` through `attr_6`); its
structural data (region, accent color, hero photo, hotels) lives in
`assets/js/destinations-data.js`; its photo gallery lives in
`assets/js/destinations-gallery.js`. The destinations page, each detail
page, and the booking form's dropdown are all generated automatically
from this data.

**To add a destination:** add its `dest_<id>_*` text keys (including
`attr_1`..`attr_6`) to `i18n.js`, add one entry to `DESTINATIONS` in
`destinations-data.js`, add its `id` to a group in
`DESTINATION_REGIONS`, and add a matching 6-photo array to
`DESTINATION_GALLERY` in `destinations-gallery.js`.

### Adding hotels (optional, per Samer)

Each destination has a `hotels: []` array — empty by default, which
hides the "Hotels We've Stayed At" section entirely. To show one:

```js
hotels: [
  { nameAr: "اسم الفندق", nameEn: "Hotel Name",
    noteAr: "ملاحظة قصيرة (اختياري)", noteEn: "short note (optional)" }
]
```

## 7. The booking form's features

- **Trip type:** single destination (default) or multiple destinations
  (add/remove stops, each with its own dates).
- **Honeymoon:** a checkbox reveals "do you know your destination?" —
  - **Yes:** the form behaves normally (destination + dates required).
  - **No:** only the **dates and contact details** are required — the
    destination picker becomes optional, and an 8-question quiz appears
    (vibe, budget, duration, season, activity level, city-vs-quiet, top
    priority, optional dream destination) so Samer has what he needs to
    suggest a destination personally. This is intentionally *not* an
    automated recommendation engine.
- **Adults / Children / Infants:** replaces a single traveler-count
  field, since pricing often differs by age group.

## 8. Deploying

Fully static — host anywhere with zero configuration: Netlify, Vercel
(drag-and-drop, no build command), or any shared hosting via FTP.

## Notes on design choices

- **Font:** Google Fonts "Cairo" — matching Arabic and Latin character
  sets, so both languages look consistent.
- **Numerals:** Western digits throughout, including in Arabic. The one
  exception is the native date-picker (`<input type="date">`), whose
  digit style follows the visitor's own browser/OS locale.
- **Mobile navigation:** a simple dropdown panel under the header.
- **Header:** on scroll it shrinks (76px → 60px), lifts off the top
  edge, and pulls in from both sides into a rounded floating bar —
  while staying `position: sticky`, so it keeps following the scroll
  rather than just animating once.
- **Colors:** a "golden hour wanderlust" travel palette — deep dusk
  ocean-blue, sunset coral-orange, and warm gold on a sand background —
  defined as CSS variables at the top of `assets/css/style.css`. Change
  `--color-primary` / `--color-accent` / `--color-gold` there to retheme
  the whole site (every component reads from these).
