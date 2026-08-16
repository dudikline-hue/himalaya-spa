# Image & video credits

All photography is from **Pexels**, used under the
[Pexels License](https://www.pexels.com/license/): free for commercial use,
no attribution required, modification permitted. This file exists as a record
of where each asset came from, not because credit is legally owed.

Every image has been cropped, colour-graded (warmed, desaturated, darkened to
sit on the green) and re-encoded, so the files in `assets/img/` are derivatives,
not the originals.

## Photographs

| File | Pexels photo ID | Subject |
|---|---|---|
| `hero.jpg` | 31196710 | Mist over a green forested mountain range — also the hero video's first frame |
| `hero-about.jpg` | 5007995 | Portrait, low light |
| `hero-contact.jpg` | 6207338 | Candles in a warm interior |
| `stats.jpg` | 5843608 | Single candle in the dark |
| `studio.jpg` | 6207338 | Candlelit interior (portrait crop) |
| `membership.jpg` | 7031704 | Modern spa interior |
| `ritual-1.jpg` | 19242406 | Serum applied to the face |
| `ritual-2.jpg` | 2661255 | Editorial beauty portrait |
| `ritual-3.jpg` | 34939744 | Serum dropper, close detail |
| `ritual-4.jpg` | 3738349 | Facial massage |
| `team-1.jpg` | 2661255 | Portrait |
| `team-2.jpg` | 5007995 | Portrait |
| `team-3.jpg` | 3861592 | Portrait, close crop |

Any ID resolves at `https://www.pexels.com/photo/<id>/`.

## Hero video

Real timelapse footage, not generated stills.

**"Timelapse 2025 Kinnaur Monsoon"** by **Dfromhimalayas** — monsoon cloud
rolling over pine forest in Kinnaur, Himachal Pradesh, in the Indian Himalaya.

- Source: <https://commons.wikimedia.org/wiki/File:Timelapse_2025_Kinnaur_Monsoon.webm>
- Licence: **CC BY 4.0** — <https://creativecommons.org/licenses/by/4.0>

**This licence requires credit, unlike the Pexels photographs.** The attribution
is in the footer of every page (`.footer__credit`). Do not remove it while the
footage is in use. If you would rather not carry a credit line, replace the
video with paid stock or your own footage and delete that markup.

Shipped as two files so every browser can play one:

| File | Codec | Size | For |
|---|---|---|---|
| `hero.webm` | VP9 | 1.2 MB | Chrome, Edge, Firefox, Chromium builds without proprietary codecs |
| `hero.mp4` | H.264 High L4.0 | 1.9 MB | Safari, iOS, older Android |

Both are 1920×1080, 16.08s. `hero.jpg` is the video's own first frame, so there
is no visible jump when playback starts.

Processing applied to the original: an 18-second segment, graded green and
slightly darkened, with a vignette; the final 2 seconds are crossfaded back over
the opening 2 seconds so the loop is seamless — measured seam difference is
~2.4/255, imperceptible. Getting that right means fading the tail **out** over
the head, not in; fading in leaves a visible jump at both the splice and the
loop point.

## Before you launch

Two things here are placeholders that should not go live as-is:

1. **`team-1/2/3.jpg` are stock portraits standing in for named practitioners.**
   Presenting stock models as your actual staff is misleading. Replace them with
   real photographs of real people, or drop the photos and keep the team section
   typographic.
2. **The founders on `about.html`** are invented, as are all treatment names,
   prices, statistics and testimonials. Swap in real content before publishing.
