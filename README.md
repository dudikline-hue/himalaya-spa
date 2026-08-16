# Himalaya — luxury wellness spa site

A six-page static marketing site. No build step, no dependencies. Open `index.html`
in a browser and it works.

```
himalaya-spa/
├── index.html          Home
├── about.html          Story, standards, team
├── treatments.html     Full menu with pricing
├── first-visit.html    What to expect + FAQ
├── memberships.html    Plans + payment plans
├── contact.html        Details + enquiry form
├── assets/
│   ├── css/style.css   Everything visual (sectioned, commented)
│   ├── js/main.js      Nav, reveals, counters, testimonials, form validation
│   └── img/            Drop your photography here
└── README.md
```

## Making it yours

**1. Brand name.** Find and replace `HIMALAYA` and `Himalaya` across the six HTML
files. The wordmark also has a sub-line (`Skin & Body`) in the header and footer.

**2. Contact details.** These appear in the footer of every page and on
`contact.html`. Search for:

- `1420 Alder Street` — address
- `+15550000000` and `+1 (555) 000-0000` — phone (the first is the `tel:` link)
- `hello@himalaya.example` — email
- The `Hours` list in each footer, and the fuller one on `contact.html`

**3. Colours.** All in one place — the `:root` block at the top of `style.css`.
The base is a deep forest green `#06140F`, type is pure white, and the accent is
a champagne `#D8BE92`. Change the accent and every button, price, rule and
eyebrow follows.

**4. Photography.** The site ships with real licensed photography (see
`ATTRIBUTION.md`). Every picture is one line in the image-slot block in
`style.css` (section 8):

```css
.photo--hero       { --img: url("../img/hero.jpg"); }
.photo--ritual-1   { --img: url("../img/ritual-1.jpg"); }
.photo--team-1     { --img: url("../img/team-1.jpg"); }
```

Swap the filename to change a picture. Delete the `url()` and it falls back to a
gradient, so a missing file never breaks the layout.

Aim for dark, low-contrast images — bright photos fight the scrim on the hero.
The supplied ones were graded down deliberately; if you drop in your own, expect
to darken them.

**Replace the three `team-*.jpg` portraits before launch** — they are stock
models standing in for named practitioners.

**5. Hero video.** A locked-off timelapse of monsoon cloud drifting over pine
forest and a snow ridge in Kinnaur, Indian Himalaya — `hero.mp4` (1.2 MB,
1600×900) on desktop, `hero-sm.mp4` (361 KB, 960×540) on phones, both 7.7s and
seamlessly looped.

It plays on mobile too; a frozen still there reads as a broken page. It is
skipped only for `prefers-reduced-motion`, data-saver, and 2G/3G, where the
poster takes over. To change the footage, replace both files and regenerate
`hero.jpg` from the new first frame.

**The footage is CC BY 4.0 and the footer credit is required** — see
`ATTRIBUTION.md`, which also documents how this particular cut was selected.

**6. Fonts.** Poppins throughout, loaded from Google Fonts in each `<head>`. To
self-host, drop the woff2 files in `assets/`, replace the `<link>` with an
`@font-face` block, and leave the `--font-display` / `--font-body` tokens alone.

## Wiring up the form

`contact.html` validates in the browser but has nowhere to send. Pick a handler
and add its endpoint as the form `action` — the JS detects the attribute and stops
intercepting the submit:

```html
<form class="form" data-validate novalidate
      action="https://formspree.io/f/YOUR_ID" method="POST">
```

Netlify Forms is even simpler: add `netlify` and `name="contact"` to the `<form>`
tag and it is captured automatically on deploy.

## Adding online booking

Square Appointments, Vagaro, Boulevard and Calendly all give you an embed snippet.
Drop it into the `#book` section of `contact.html`, and point the header
`Book a consultation` buttons at `contact.html#book` (they already do on that page).

## Publishing

Any static host works. Two zero-config options:

- **Netlify** — drag the `himalaya-spa` folder onto app.netlify.com/drop
- **Vercel** — `npx vercel` inside the folder

Both give you HTTPS and a free subdomain; point your own domain at it from their
dashboard.

## The moving parts

Section 14 of `style.css` holds the flourishes, each independent — delete any
block and the rest still works:

- **Intro curtain** — a green panel with the wordmark that lifts on load. Has a
  3-second failsafe so a stalled asset can never trap the page behind it.
- **Split-text headlines** — any `<h1 data-split>` is diced into per-word masks
  that rise in sequence.
- **Masked photo reveals** — pictures wipe open with `clip-path` rather than
  fading.
- **Film grain** — an animated SVG noise layer over every hero.
- **Marquee ribbon** — the scrolling treatment names; pauses on hover.
- **Gallery strip + lightbox** — click any photo to enlarge; Escape or a click
  outside closes it.
- **Hero parallax** and a **shine sweep** across the primary button.

All of it is disabled under `prefers-reduced-motion`.

## Notes

- Passes with JS disabled: content is all in the HTML, only motion and validation
  are scripted. The curtain is CSS-hidden for reduced motion and removed entirely
  by the script, so it can never hide content.
- Reveals are driven by an rAF-throttled scroll sweep rather than a bare
  IntersectionObserver, because a fast flick or an anchor jump can skip an
  element past the viewport and leave it invisible forever.
- Honours `prefers-reduced-motion` — reveals and counters resolve instantly.
- Keyboard accessible: skip link, focus rings, Escape closes the mobile nav.
- Update the `<title>` and `<meta name="description">` per page for SEO; they are
  already distinct but written for placeholder content.
