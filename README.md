# Al Sadu Cable Weave — loom model

Live: **https://stephanschulz.github.io/sadu-weave/**

Or open **`sadu-weave.html`** in a browser (double-click it). No server, no build, no
dependencies. Use `file://` — the exports are real file downloads.

The earlier "field model" version (figures as displacement fields, forking cords)
is kept in `saved designs/v2-field-model/` together with the favourites saved
from it; those favourites show in the list as view-only.

---

## The one number that shapes the whole piece

1000 cables over 7 m is a **7.0 mm pitch on a 5.5 mm cable**. That is 79 %
coverage: a solid black curtain, and no pattern can read there at single-cable
resolution. Negative space only reads below about 50 %.

The way out is grouping cables into **strands** — and that is also what al sadu
is: a warp-faced weave whose pattern lives in how the warp is ordered. Here the
warp is the cables, running down the wall, and every pattern pair is a strand of
15–20 cables at the beam. Coverage sits around **20 % top to bottom**. It stays
flat because the warp never forks: the number of strands is fixed by the
composition, cables simply shed out of them as the bulbs drop.

## The grid

*orient on a grid* (default on, 100 mm) puts the whole weave on a square lattice.
Columns and rows are both at the grid pitch, and every move is axis-aligned: a
strand descends a column, runs **along a row line** to a new column (at most *max
run per row* cells), then descends again. Diagonals become staircases — which is
how a pixel chart renders them on a real loom too. The twine becomes a column
swap between neighbouring strands on a row line; weft floats land on row lines;
*lane offset* keeps rightward and leftward runs on a row from overlapping.

The arithmetic the grid pitch decides: 1000 cables over 7 m is a 7 mm curtain.
On a 100 mm grid the wall is **70 × 69 cells → 70 strands of ~14 cables**
(Ø≈22 mm). Groups of 25 would be 40 strands at 175 mm — set the pitch to 175 mm
for that. The panel shows the live figure. If the composition needs more pairs
than the grid has columns the sett shrinks and the panel says so in red.

**Cost of the horizontal travel.** With a weft row every 2 picks and every strand
floating, cables travel a lot: total cable rises from ~3.8 km to ~5.5–6 km,
hanging mass from ~275 kg to **~300–365 kg (43–52 kg per metre of beam)**, and the
longest cuts reach 14–19 m. Fewer weft rows, or *chain* instead of *all*, brings
it back. This is reported, not hidden.

## How the model follows the loom

The description has three layers; the code has those, plus the weft you asked for:

1. **Warp order = the composition.** A row of vertical bands laid out left → right:
   border bands, ground gaps, one centre band, then the borders mirrored. It is
   fixed before the first pick. The warping is the program.
2. **Per-pick bitmask = the motifs.** Every border motif and every centre glyph is
   a small 0/1 chart: one column per pattern pair, one row per pick. At each tie
   row, the strands of a band are routed (monotonically, so nothing tangles) into
   that row's dark cells, bunching where a row has few of them. Bunched strands
   read dark; spread strands read as ground. That routing is the pickup.
3. **Weft and ribs = cables travelling across.** Every cable starts at the beam,
   but at a *weft row* (every k-th pick) some leave their strand, run horizontally
   along the row line, are **tied at every strand they cross**, and continue down
   with the strand where the run ends. At a later weft row they may go over again,
   direction alternating like a shuttle. Two numbers shape the row: *run length*
   (cells) and *run start every* (cells). Starts closer together than the length
   make runs **overlap and hand over** — several cables form one continuous rib
   across the full width, about length ÷ spacing cables thick, holding the strands
   at that height. Runs are also started "before" each edge so the rib is full
   thickness right up to the wall, and a strand will give its last cable to keep a
   rib continuous. **Default: a rib at every pick** — horizontal lines at the same pitch
   as the vertical ones, every strand tied at every row: a net, not independent
   strands. Weft duty is shared fairly: each row's runs start from a shifting set
   of strands, the cable chosen is the one in that strand that has travelled
   least, never twice in one row and never more than *max floats per cable*
   (default 4) — without this a handful of survivors low on the wall shuttled
   back and forth into 36 m cuts. The panel reports *full-width ribs* (rows
   continuous edge to edge), *rib thickness, thinnest / mean*, and a row-by-row
   chart of the thinnest point. Expect full 2-cable ribs to ~4.5 m, thinning
   below, none in the last metre: ribs can only be as thick as the cables still
   there, and by 6 m most have dropped to their bulbs. *span* keeps runs inside a
   band or lets them cross the whole width. Every run is in `weft.csv` and on the
   DXF `WEFT` layer; each strand crossed is a tie.
4. **Twining = the overlay.** A small antiphase zigzag between neighbouring
   strands, in pattern-pair pitches, so they cross and cross back every period.
   It sits on top of the chart, as the twining sits on top of the weave.

The lexicon of border motifs (`stripe`, `hubub` seeds, `dealla` ribs, `uwairjan`
pebbles, `zigzag`, `ein` eye, `dhurs el khail` horse teeth, chevron, cross,
diamond chain, `shajar` fir tree, ladder, facing teeth) and the glyph dictionary
for the centre (`shajarah`: large / nested / solid diamond, hourglass, tree,
arrow, comb, stepped triangle, double eye, bars) are plain string rasters at the
top of the script — add your own by adding rows of `0`/`1`.

**Anisotropy is a choice now.** On the grid, cells are square (100 × 100 mm) and
chart row = ties stretches motifs along the warp; in free mode (grid off) picks are
~220 mm apart and a one-pair move leans ~24° from vertical.

**The centre is a line of text.** A sequence of discrete glyphs separated by
ground. *fit sequence to height* distributes the ground so the sequence is read
exactly once from beam to floor. Border bands are short-period repeats and tile
forever.

## Physical rules that are enforced, not just reported

- **Max angle** slew-limits the total lateral move of any strand between two tie
  rows. A sharp gather is spread over more rows rather than asking a cable to lean
  further than that.
- **Tails only push bulbs down.** A cable shed at row *r* lands at `r·dy + tail`,
  never above, so shedding on a plain depth profile starves the top and piles up
  the floor. γ states the *bulb* distribution you want; the app deconvolves the
  tail kernel (Richardson–Lucy) to get the shed schedule.
- **Bulb x is the last tie's x** (a free cable hangs plumb). A blue-noise picker
  chooses which strand sheds at each row so bulbs don't comb into stripes.
- **No stretch** (nylon core) ⇒ cut length = path + tail, exactly.

## Reading the right-hand panel

| Readout | What it means |
|---|---|
| Loom chart | the pickup chart as woven — this *is* the notation; the wall is its rendering |
| sett / pick pitch / anisotropy | pattern-pair pitch, tie-row pitch, and their ratio (sadu is ~2 : 1) |
| centre sequence | picks in the glyph sequence vs picks available; red if cut off |
| crossings per cable, turns | the interlacing, counted |
| weft rows · floats · warp floated over | the horizontal weave, counted |
| steepest run | never above *max angle* |
| tightest pinch `n×` | where a pick gathers a whole band into one pair; cables stack ~n deep. Up to ~2 is a knot, past 3 it won't tie |
| vertical evenness CV | bulbs per 0.5 m slice; < 0.15 is even |
| whole-piece lateral net | asymmetric compositions drag sideways; mirroring cancels it |

## Favourites and Evolve

**Randomise all** draws every *design* variable over its full range — grid on/off
and pitch, max run, lane offset, rows, chart scale, twine, mirroring, γ, tails,
top clearance, every weft/rib setting, borders, centre glyphs. Wall size, cable
count, Ø, g/m and bulb mass are facts and stay put.

**★ Save** (or `s`) stores the full composition, every metric and a thumbnail.
Every *Randomise all* / *New seed* is logged as *seen*, so the export carries the
liked set and the passed-over set. **Evolve** shows a 5×5 map of mutants around the
current design; the axes are the two principal directions along which your saved
favourites differ (PCA). Click a tile to adopt it — saved, re-centred. Mutations
drift the numeric genes (rows, γ, tails, twine, pairs/col, gaps, phases) and jump
the structural ones (motifs, glyphs, band count, mirroring, fit).

## Ballpark, 7×7 m / 1000 cables

Grid on, a rib every row: ≈ 4.8–7 km of cable, **≈ 310–400 kg hanging**,
**≈ 45–57 kg per metre of beam**, cuts to 13–21 m (mean ≈ 5–7 m). Grid off / light weft:
≈ 3.8–4.5 km, ≈ 265–280 kg, ≈ 38–40 kg/m, cuts to ~9 m. Bulb mass dominates — it is a parameter, set it to the real
part.

## Exports

| File | For |
|---|---|
| `cables.csv` | per-cable cut length, anchor, strand, band, turns, bulb position, waypoints — the shop drawing |
| `bulbs.csv` | bulb coordinates + nearest-neighbour distance |
| `tie-sheet.csv` | every tie: row, height, strand, band, pair column, x, cables, Ø, tension, lateral pull |
| `crossings.csv` | every over/under: rows, height, x, which strand passes which |
| `weft.csv` | every float: row, height, from/to strand, x, cables, strands floated over |
| `loom-chart.txt` | the bitmask notation, `#` `.` and gaps |
| `elevation.svg` / `.dxf` | 1:1 in millimetres |
| `design.json` | parameters + summary — reproduce exactly |

Keyboard: `r` new seed · `s` save favourite · `p` polarity · `1`–`4` views.
