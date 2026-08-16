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

**"Timelapse 2025 Kinnaur Monsoon"** by **Dfromhimalayas** — monsoon cloud
drifting across pine forest and a snow ridge in Kinnaur, Himachal Pradesh, in
the Indian Himalaya.

- Source: <https://commons.wikimedia.org/wiki/File:Timelapse_2025_Kinnaur_Monsoon.webm>
- Licence: **CC BY 4.0** — <https://creativecommons.org/licenses/by/4.0>

**This licence requires credit.** The attribution is in the footer of every
page (`.footer__credit`). Do not remove it while the footage is in use.

| File | Size | Used on |
|---|---|---|
| `hero.mp4` | 2.2 MB, 1600×900 | Screens above 900px |
| `hero-sm.mp4` | 993 KB, 960×540 | Phones and small tablets |

Both are 8.0s. `hero.jpg` is the video's own first frame.

### Making the loop actually seamless

Comparing the first and last frame is not sufficient — it misses a jump in
*motion*, and it misses compression. Measure instead against the clip's own
average frame-to-frame change:

- **Seam / average frame step** should be at or below 1.0. This cut is
  **0.95x**, i.e. the wrap is a smaller change than an ordinary frame step.
- **Also scan for internal spikes.** An earlier cut hid a 14.8x jolt at 0.64s
  from an exposure flicker in the source. The window used now is chosen to
  contain no step above 3x.

Two separate causes had to be fixed:

1. **Construction.** Verified by encoding losslessly: the crossfade-tail-over
   -head build measures 1.11x with no codec in the way, so the geometry was
   always right.
2. **Compression.** The encoded version still measured 1.65x, because frame 0
   is a clean keyframe while the last frame is heavily predicted, so the two
   carry different noise. Fixed with `-bf 0 -g 50 -keyint_min 50
   -sc_threshold 0` — no B-frames and a closed GOP make frame quality uniform
   across the wrap. This costs roughly 1 MB, which is the reason the file is
   2.2 MB rather than 1.2 MB. Revert those flags if you would rather have the
   smaller file and can live with a faint shimmer at the loop.

### How this cut was chosen

The clip runs 22s and most of it is a white-out. The section actually used was
picked by measuring, per candidate window, the share of pixels that are bright
and colourless (fog), green-dominant (foliage), and blue-dominant (sky), plus
camera drift from cross-correlated brightness profiles:

- **Start 17.6s, 6s long** — fog 10.3%, green 12.8%, camera drift 1px. The
  opening seconds everyone reaches for first are the worst of the clip: 36%
  fog, 4% green.
- **`crop=1300:731:600:300`** — the right of frame holds the green ridge while
  the left is solid cloud. Cropping there roughly halves the fog again.

Re-run that measurement before re-cutting; the eye is a poor judge of which
five seconds of a foggy clip are least foggy.

### Other notes

- **Do not try to grade fog away.** An earlier attempt pushed saturation and a
  colour balance hard enough that the fog-share metric read 0% — but only
  because the white had been tinted mint. It looked worse. Keep highlights
  neutral and fix fog by choosing the shot, not the curve.
- **The camera must be locked off.** This one measures 1px. A rainforest clip
  that looked better on paper drifted 104px peak-to-peak even in its calmest
  4-second window and read as restless.
- **Grade for clarity with an S-curve** that pulls shadows to true black; haze
  lifts the black point, so dimming only dulls.
- **Do not sharpen** — `unsharp` amplifies what the codec struggles with and
  ballooned an earlier cut to 14 MB. `hqdn3d` costs nothing visually.
- **H.264 only.** VP9 encoded ~2x larger on detailed footage.
- Measure the loop seam with `select='eq(n,0)+eq(n,N-1)'`, not `-sseof`, which
  lands on the wrong frame in a long-GOP encode. This cut measures 3.2/255.

## Before you launch

Two things here are placeholders that should not go live as-is:

1. **`team-1/2/3.jpg` are stock portraits standing in for named practitioners.**
   Presenting stock models as your actual staff is misleading. Replace them with
   real photographs of real people, or drop the photos and keep the team section
   typographic.
2. **The founders on `about.html`** are invented, as are all treatment names,
   prices, statistics and testimonials. Swap in real content before publishing.
