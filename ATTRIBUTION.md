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

`assets/img/hero.mp4` is **not** stock footage. It was generated locally with
ffmpeg from three Pexels stills — 31196710 (green misted forest), 19174994
(misted cliff) and 13793150 (pines in fog) — as a slow ken-burns sequence with
crossfades, graded deep green, fading from and to black so the loop is
invisible. 1280×720, 23s, ~300 KB.

To regenerate it after swapping the source frames, the shape of the command is
in the project history; the essentials are `zoompan` with `d=1` (using `on` for
the zoom ramp — with `d>1` ffmpeg multiplies frames and you get a 27-minute
file), `xfade` between clips, and `fade` in/out at the ends.

## Before you launch

Two things here are placeholders that should not go live as-is:

1. **`team-1/2/3.jpg` are stock portraits standing in for named practitioners.**
   Presenting stock models as your actual staff is misleading. Replace them with
   real photographs of real people, or drop the photos and keep the team section
   typographic.
2. **The founders on `about.html`** are invented, as are all treatment names,
   prices, statistics and testimonials. Swap in real content before publishing.
