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

**"Lenticular cloud over Longs Peak, Colorado (time lapse)"**

- Source: <https://commons.wikimedia.org/wiki/File:Lenticular_cloud_over_Longs_Peak,_Colorado_(time_lapse).ogv>
- Licence: **CC0 / public domain** — no attribution required, no restrictions

Because this clip is CC0, the footer credit line that the previous footage
needed has been removed. Nothing on the site now carries an attribution
obligation.

| File | Size | Used on |
|---|---|---|
| `hero.mp4` | 975 KB, 1600×900 | Screens above 900px |
| `hero-sm.mp4` | 283 KB, 960×540 | Phones and small tablets |

Both are 20s. `hero.jpg` (52 KB) is the video's own first frame.

Note the location is the Rockies, not the Himalaya. It was chosen because it is
the only freely-licensed clip found that actually matches the brief — a locked
-off camera, a sunny deep-blue sky, snow-capped peaks, and cloud visibly moving
across frame. Swap it if you find genuine Himalayan footage.

### Notes if you re-cut it

- **The camera must be locked off.** Two earlier attempts used handheld clips
  and read as restless. Measured by cross-correlating column brightness
  profiles between frames: the forest clip drifted 104px peak-to-peak (22% of
  frame width) even in its calmest 4-second window, with no steady stretch
  anywhere. This one is 0px. Do that measurement before committing to a clip.
- **Crop out dead foreground.** The source has a dull grey rock slope across
  the bottom 45%; `crop=1422:800:249:0` takes a 16:9 window from the top so the
  frame is sky and peaks.
- **A static camera means a plain crossfade loop works** — tail faded out over
  the head, 3s. Seam measures 1.3/255. A boomerang is only needed when the
  camera moves.
- **Grade for clarity, not darkness.** Haze lifts the black point, so an
  S-curve that pulls shadows down
  (`curves=all='0/0 0.18/0.08 0.5/0.52 0.82/0.90 1/1'`) de-fogs where dimming
  only dulls.
- **Do not sharpen.** An `unsharp` pass amplifies exactly what the codec
  struggles with; it pushed an earlier cut to 14 MB. `hqdn3d` costs nothing
  visually and shrinks the file.
- **H.264 only.** VP9 encoded ~2x larger on detailed footage, and every
  browser that matters decodes H.264.
- Measure the loop seam with `select='eq(n,0)+eq(n,N-1)'`, not `-sseof`, which
  lands on the wrong frame in a long-GOP encode and reports a seam that is not
  there.

## Before you launch

Two things here are placeholders that should not go live as-is:

1. **`team-1/2/3.jpg` are stock portraits standing in for named practitioners.**
   Presenting stock models as your actual staff is misleading. Replace them with
   real photographs of real people, or drop the photos and keep the team section
   typographic.
2. **The founders on `about.html`** are invented, as are all treatment names,
   prices, statistics and testimonials. Swap in real content before publishing.
