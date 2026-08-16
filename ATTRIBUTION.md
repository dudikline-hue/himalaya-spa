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

Real footage, not generated stills.

**"From the mountain high, the forest stretches like a green ocean"** by
**Mathanprasath K** — misted forested ridges receding into haze.

- Source: <https://commons.wikimedia.org/wiki/File:From_the_mountain_high,_the_forest_stretches_like_a_green_ocean,_kissed_by_mist_and_rain_%E2%80%94_a_silent_breath_of_nature,_and_continue_with_move_on.webm>
- Licence: **CC BY 4.0** — <https://creativecommons.org/licenses/by/4.0>

**This licence requires credit, unlike the Pexels photographs.** The attribution
is in the footer of every page (`.footer__credit`). Do not remove it while the
footage is in use. Replace the video with paid stock or your own if you would
rather not carry a credit line.

| File | Size | Used on |
|---|---|---|
| `hero.mp4` | 2.3 MB, 1600×900 | Screens above 900px |
| `hero-sm.mp4` | 784 KB, 960×540 | Phones and small tablets |

Both are 11.4s. `hero.jpg` is the video's own first frame, so there is no jump
when playback starts.

### Notes if you re-cut it

- **H.264 only, deliberately.** VP9/WebM encoded roughly *twice as large* on
  this footage — dense moving foliage is its worst case — and every browser
  that matters decodes H.264.
- **The loop is a boomerang** (forward, then reversed). The shot pans, so a
  straight tail-over-head crossfade left a visible jump of ~13/255 between the
  last and first frame; playing it forwards then backwards brings that to ~3.7,
  which is invisible. Drop one frame off the reversed half or the turnaround
  frame is duplicated.
- **Grade for clarity, not darkness.** Haze lifts the black point, so the fix
  for a foggy look is an S-curve that pulls the shadows back down
  (`curves=all='0/0 0.18/0.07 0.5/0.52 0.82/0.90 1/1'`), not more brightness
  reduction. Verify by checking the shadow floor actually reaches 0.
- **Do not sharpen.** An `unsharp` pass amplified exactly the high-frequency
  detail the codec struggles with and pushed the file to 14 MB. `hqdn3d`
  denoise does the opposite and costs nothing visually.
- Measure the loop seam with exact frame selection (`select='eq(n,0)+eq(n,N-1)'`),
  not `-sseof`; on a long-GOP encode the latter lands on the wrong frame and
  reports a seam that is not there.

## Before you launch

Two things here are placeholders that should not go live as-is:

1. **`team-1/2/3.jpg` are stock portraits standing in for named practitioners.**
   Presenting stock models as your actual staff is misleading. Replace them with
   real photographs of real people, or drop the photos and keep the team section
   typographic.
2. **The founders on `about.html`** are invented, as are all treatment names,
   prices, statistics and testimonials. Swap in real content before publishing.
