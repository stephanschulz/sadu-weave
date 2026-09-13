# Al Sadu Cable Weave — loom model

Live: **https://stephanschulz.ca/sadu-weave/** · lattice editor: **https://stephanschulz.ca/sadu-weave/lattice-editor.html**

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

## Structure — no corner in mid-air

Two things the first grid version got wrong (your screenshots): runs that ended on
a strand with no cables left, leaving a 90° corner hanging in mid-air; and whole
bundles stepping sideways with nothing to turn against. The generator now
enforces a **support rule** on the grid, with real physics behind it:

- A column is **anchored** at a row if a strand with cables arrives there
  vertically (it does not move that row). Plain ground strands are permanent
  anchors as long as they carry cables.
- A hanging net has no bottom beam, so a rib is only a structural member if it
  is tensioned — between anchors and, with **edge rails**, the wall. `rib
  pretension` is what you would tension each rib to between the rails (default
  250 N); the rails need a tie point at every row on both edges (`rail ties`).
- Every 90° corner must sit on an anchor, or on a rib where the sag it causes,
  **W·a·b / (T·L)**, stays under `allowed rib sag` (default 40 mm). W is what that
  bundle still carries below the row (14 cables near the beam pull ≈ 55 N; one
  cable near the floor ≈ 1 N), a and b the distances to the nearest anchors.
- Moves that cannot be supported are shortened toward the strand's own column
  (`moves shortened for support`). A run may only land on a strand that still
  has cables. After the ribs are built the app checks that a rib really exists
  under every rib-held corner; any that fail are `corners without support`,
  drawn as red ✕ in the Technical view. Expect a few dozen, all in the lowest
  rows where the ribs have run out of cables.

- **Structural columns run to the bottom.** The plain ground strands between
  tiles (or bands) keep `structural column reserve` cables (default 3) all the
  way to the last row — never given to a rib, never dropped to a bulb early — so
  there is always a live vertical to tie to, even in the lowest metre where the
  pattern strands have emptied. A run may only land on a column that provably
  continues below (a structural column, or a strand with ≥ 2 cables), and a
  strand that just received a run is never emptied in that same row. The panel
  reports *structural columns to the bottom* and *runs landing on a column that
  ends there* (must be 0); the Technical view draws structural columns as
  full-height orange rails.

What this taught us, measured: with no fixed column between tiles even 600 N
ribs leave half the motif frozen near the beam; **one plain anchor strand between
tiles** at 250 N frees it almost completely (84 of ~2,300 moves shortened). The
anchor column is the structure; the rib tension is secondary.

**Everything on the grid.** In grid mode every segment is exactly vertical or
exactly horizontal: strands sharing a cell sit on the column line, each cable
keeps a fixed slot inside its bundle for life (so it never drifts sideways as
neighbours shed or hop), and horizontals lie on the row line (`lane offset` 0;
raise it only if you want rightward and leftward runs drawn apart). The **grid**
toggle in the top bar (or `g`) draws the lines the cables follow — column centres
and row lines, every tenth stronger, with a metre scale. The Technical view draws
strand centrelines the same way the cables are built — down, then along the row
line — plus structural columns (orange rails), floats (teal), crossings, corners
held by ribs (hollow squares) and any unsupported corner (red ✕).

## Diagonals

*diagonal moves* builds a strand's column change as a straight cable between the
two tie nodes instead of down-then-along-the-row — physically just a cable
between two ties; the support rule applies at the nodes exactly as before. The
angle is set by the grid: one cell per row on the square 100 mm grid is **45°**.
30° and 60° need a 1 : √3 ratio the square grid cannot make, so *row pitch* can
differ from the column pitch: **173 mm rows** with one cell per row are exactly
**30°** from vertical; **115 mm rows** with two cells per row (the `zigzag — 2
cells per row` motif) are **60°**. Presets *Diagonals 45° / 30° / 60°* are the
zigzag tile with those settings; measured, every diagonal segment sits at the
named angle (the 60° preset has a few single-cell 41° steps where the support
rule shortened a two-cell move). Randomise-within keeps the angle.

## Diagonal lattice — every cable on an angle

*composition* = **diagonal lattice** makes every cable a straight diagonal. From
each start column (*start every* cells) two strands leave the beam, one at +θ and
one at −θ, each with half the cables; they cross the other family at every node
(a tied crossing) and bounce off the edge rails. No ribs and no anchor columns:
at every crossing the two families' sideways pulls cancel, so the net holds
itself like a hanging fishnet — the rails only take the bounces (the panel
reports the count and the worst pull on a rail tie). θ comes from the grid as
above: 45° square, 30° with 173 mm rows, 60° with 115 mm rows and two cells per
row (which needs *start every 1*, or half the columns are never visited).
Presets *Lattice 45° / 30° / 60°*. Bulbs hang from nodes; drift is
off (there is no rib to run along). Measured on the 45°: 33,078 diagonal
segments, all at 45°, zero horizontals, 99 tied crossings per cable, 311 kg.

### Lattice angle

Every lattice design listens to one **lattice angle** slider (under the Randomise buttons, 15–75° from
vertical). The row pitch is derived from it — row = cells/row × column pitch ÷
tan θ — so 45° is the square 100 mm grid, 30° gives 173 mm rows, 60° gives 58 mm
rows (or 115 mm with *2 cells/row*). Measured: every diagonal segment sits at
the set angle. Randomise-within keeps the angle; the full-range draw varies it.

### Pattern strands on a base lattice — the way that works

*pattern strands travel along the lattice* splits the cables in two roles. A
**base lattice** takes `base share` of them: two thin strands from every base
start column (`start every`, 2 on the presets → 70 base strands), straight ±θ,
every crossing zip-tied or knotted, stretched between the rails with `net
pretension` (200 N on the presets). The rest form **pattern bundles**, two per
base start column, one each way (70 on the presets, ~11 cables each — about the
tile layout's strand), that move node to node along the lattice edges — exactly
±1 cell per row. Every cable is still a straight diagonal between ties.

**The turned tile — what can and cannot hang.** The wanted look is the tile
design turned by 45°: its columns become one lattice direction, its ribs the
other, its brick-like rectangles sit on the diagonals. A literal turn of the
tile's *cable paths* cannot be built: the tile's along-the-rib moves go both
ways, and after the turn one of the two runs uphill (tested — the one-way
version collapses, every bundle drifts to its band's edge and the chart is
lost; it is kept as the *tile rule turned literally* frame for comparison).
Turned as an *image* it is fine: a rectangle whose sides lie on the lattice has
all four sides downward-traversable — top corner to the two side corners to the
bottom corner — so two bundles draw it, parting at the top and meeting at the
bottom. That is what the lattice does.

**Off-grid interconnects (the turned tile).** With *chart frame = the tile
turned*, the tile's own chart and pickup run in the lattice frame and every
tile move "down one row, along k cells" becomes **one straight cable between
two nodes** — an off-grid interconnect: along one way the segment to node
(c + s(1−k), r + 1 + k) (k = 1 a vertical, k = 2 a steep line), along the other
way the horizontal hop along the rib line (`pattern moves` must allow it).
*along-moves = chevron* draws the same move on the lattice instead (down one
step, then k along the other direction) — that is the picture of the
screenshot rotated by hand, since the tile's horizontals become the other
diagonal. Every segment is tied at both ends and starts with the node
stiffness test. Bundles on the chart's ground columns run straight — the
tile's anchor columns turned. Presets *Lattice + eyes / zigzag / diamonds /
pebbles* use the turned tile with the tile motifs; *bricks* and *cells* use
edge following on lattice-frame charts. `turned_interconnects.png` in this
folder compares the variants against the rotated screenshot.

**Flow — the lattice carries the pattern (the current model).** Stephan's
concept: build the thin lattice, then run many cables along its lines to
thicken the lines the design wants, evenly, thinning toward the floor as the
cables shed. *flow* does exactly that: every cable rides the lattice lines;
at every crossing the two lines pool their cables and part again — the
segment below that the chart marks dark takes the share (weight 1), the light
one keeps a single lattice cable (weight 0.05), with a look-ahead Φ (dark
nodes reachable below, discounted 0.6 per row) so cables are routed toward a
figure before they reach it. Shedding prefers light segments and never takes
a line's last cable above `base ends below`. Every cable path is a lattice
path (monotone, tied at every crossing), every segment's thickness is its
cable count, the wall is homogeneous left to right, and the picture is
independent of the bulb seed. The share a carrier-only segment takes is `light share` (0.04 on the
presets — a few cables, so the thin lines stay thin); the look-ahead only
tips the balance between two like segments. Flow needs an **even** start
pitch (2 = 20 cm, 4 = 40 cm): with an odd pitch the two families cross
between rows, not at nodes. Figures read best when the chart cell is a whole
lattice diamond and the mesh is coarse — the presets use the 40 cm mesh, so an
eye is a 1.2 m diamond outline of thick cable on a thin net. Presets *Flow ·
eyes / big eyes / bricks / cells / diamonds / pebbles / eye (tile chart)*; `flow_zoom.png` and
`flow_presets.png` show them against the rotated screenshot. Rail bounces are
part of the lattice, so the figures shift phase at the rails.

**Carrier = verticals + one diagonal family (V+D).** *carrier* in the lattice
box switches from the ±θ diamond net to verticals plus diagonals running one
way (down-right). Nothing reflects: a diagonal that reaches the right rail
hands its cables to the right-rail vertical (which sheds them fast), and
diagonals also enter from the left rail, fed by a left-rail vertical that
starts with `rail share` of the cables (30 % on the preset). The chart frame is
(vertical index, diagonal index), so the tile's Cross net — bold verticals
with rungs — becomes *Flow · cross net V+D*: bold verticals with the rungs
running along the diagonals. Inherent to one-way diagonals on a top-hung
wall: the lower-left is only as rich as the left rail's share, and the right
edge collects what the diagonals bring.

**Drawn designs in the weave app.** *load drawn design* (lattice box) takes
the editor's JSON or SVG. The painted segments become the flow chart at
segment level: a lattice segment is dark if it is a painted segment translated
by whole multiples of the two repeat vectors. The repeat is read from the
drawing itself: draw one motif several times in different colours, and the
two shortest independent offsets between the colour copies are the repeat
(one colour = repeat by the motif's own width). Segments are kept in lattice
units — i = x ÷ (pitch/2), j = y ÷ one row — so a drawing made on a 20 cm
45° sheet maps onto the app's 20 cm 45° carrier (the ±θ carrier is shifted by
one column so node parities coincide). On V+D the node-to-node step is a whole
pitch, on ±θ half a pitch. `drawn_charts.png` shows the derived chart beside
each drawing, `drawn_designs.png` the flow result. Presets *Drawn · V+D eye
chain (1914)* and *Drawn · ±45 eye chain (1906)* embed the two drawings of
2026-09-12 (`saved lattice manual designs/`).

**Where the cables go when a drawn figure ends — sinks.** Measured on the
1906 chain: the node splits are right (4 % misrouted), but a closed shape has a
bottom vertex where a cable cannot stop, and the top beam hangs all 1000 cables
whether a line starts into a figure or into a gap. So three rules now apply to
drawn designs: cables are **anchored by the design** (a top start gets its
share by what its first segment runs into — painted ≈ full, plain ≈ the light
share); a bundle at a **sink** (plain segment ahead, no painted way down at
the node) sheds to bulbs first, within the row's bulb budget (`shed at sinks`,
`sink budget ×` — above 1 the wall empties early, so 1 is the default); and
what the budget cannot take runs the plain lattice to the next figure, steered
by the look-ahead. Result on the two drawings: 20–30 % of the cables are on
plain lines through the middle of the wall (≈5 cables a line against ≈15 on
the figures), more near the beam. That residue is physics, not a bug: a design
whose figures connect downward (each element's bottom running into the next)
keeps its cables and reads far cleaner than one made of closed diamonds. Sub-
segments from the editor's anchor subdivision merge into their node-to-node
segment; it counts as painted when at least half of it is. Free lines that are
exactly one lattice step join the chart; off-grid free lines are counted in
the readout but not used by the flow yet (the flow routes along lattice
lines only).

**Route model — a cable per design path, or cables chained through
several designs.** *drawn design → cables* in the lattice box. The tiled motif
is cut into **paths**: monotone runs of painted segments (a closed diamond is
two paths; the 1906 drawing gives 133 copies and 860 paths on the wall). Then:
*one* — one cable per path (round-robin if there are more cables), brought
from the beam by the cheapest monotone lattice route (plain segments cost 1,
another copy's segments 4, routes already used more — connectors stay thin and
spread); the bulb hangs where the path ends. *chain* — every cable gets an end
row from the bulb schedule (so bulbs stay evenly spread by height, longest
cables first), runs beam → path → the nearest next path below it has length
for → … and spends what is left straight down the plain lattice; passes repeat
while cables remain, so paths get several cables (≈7 per cable on the 1906
drawing) and read bolder. *equal* — every cable the same length: on a ±45°
lattice every segment descends the same, so all cables end at depth 0.71 · L
and the bulbs form one line; kept to show why. Route modes need the ±θ carrier
at start every 2 and a drawn design; `route_modes.png` compares them. This is
the model that draws a hand-drawn design faithfully: the carrier stays a
single cable, the design lines are the routed cables, thickness is how many
cables trace a path.

**12-fold star net — the cables are the net, all the same length.** Stephan
identified the reference pattern as six families of equally spaced straight
lines at 30° steps (horizontal, vertical, ±30°, ±60°): the H/V grid is one
square lattice, the obliques two triangular ones, and because √3 is
irrational the superposition never repeats — every square is cut differently
— while 12-ray nodes and 12-pointed rosettes appear where the families
coincide (`pattern_12fold.png`). Layout *12-fold star net*: the lines
through the wall's centre at `line spacing` are cut into segments at their
crossings (40 cm: 126 lines, 2405 crossings, 5008 segments, 728 m of net).
**Every cable has the same length** (`cable length`): it starts at a beam
crossing near its bulb (± `anchor jitter`), and its bulb is one of 1000
evenly spread (blue-noise) targets tied to the nearest crossing above. At
every crossing it chooses the next segment: while it has more length than
the exact shortest allowed route to its tie needs (a reverse Dijkstra over
downward-or-level moves, dead ends excluded), it *wanders* — horizontals
first, then the 60° lines, on little-used segments, never up, never onto the
tie's own row, never doubling back on a line; once the spare would fit a
tail it *finishes* along a shortest route. Result on 9 m / 40 cm: every
segment carries ~11 cables on average, ~1000 of 5008 carry none, all 1000
cables arrive or stop where their length ends (12 % stop 1–2 m short, the
bulb hanging there), and the net is homogeneous top to bottom with bulbs at
every height (`star_net.png`). The honest limit: a bulb high on the wall
cannot use 9 m of cable above it — there is not enough net above a shallow
tie to wind through — so with *exact length* on, that spare hangs as a long
tail (bulb lower than planned; ~40 % of cables on 9 m, ~35 % on 7 m); with
it off the tails are capped and the spare is only reported. Shorter cables
and a finer net reduce it; equal length and evenly spread bulbs pull against
each other in the top metre of the wall.

**Lattice editor (`lattice-editor.html`).** A second, small app for drawing a
design by hand on the carrier lattice: pick the carrier (±θ diamonds, verticals
+ one diagonal, verticals + both diagonals), angle, pitch and wall size; the
lattice is built the way the sheets are (every line from the top or a rail,
reflecting where it should, angle snapped so the floor is a node row). Click
or drag over segments to colour them (six colours + eraser; shift-click paints
a whole line; `z` undoes), set the design stroke width, split each vertical or
diagonal cell into several paintable pieces (*anchors per cell* — extra tie
points between two crossings, each shown as a dot), draw **free lines** from
any anchor dot to any other (click a dot, click another; a straight cable
between two tie points, on or off the lattice; a second line between the same
two anchors sits beside the first; clicking a line with its own colour deletes
it, another colour recolours it), and save an **SVG**
(centimetre units, carrier as thin lines, painted segments as drawn, the
design data embedded in `<metadata>`) or a **JSON** (segment ids + end points
in metres) that reloads, and that the weave app can take as a chart later.
Work is autosaved in the browser; downloads need the page opened from
file://.

**Free interconnects — the lattice as structure only.** With *free
interconnects* on, the pattern has its own grid (`pattern cell`, 2 steps = 20
cm on the presets) and its bundles tie wherever they cross a lattice cable or
another bundle; the lattice is structure only and can be coarse (`start every`
4 = a 40 cm mesh of single cables, 4 % of the cables). The turned tile then
runs at the tile's own weight — 70 bundles of ~14 cables, a bundle on every
pattern column — and a move is one straight segment across a whole cell:
"down a cell, along k" is the vertical (k = 1) or the steep line (k = 2), the
other way the horizontal hop of one cell. The node-stiffness test is skipped
for free bundles (they are tied to what they cross, not to a node). This is
the model for **"a repetitive pattern, homogeneous across the whole surface"**
on the diagonal: both bundle families draw the same chart, so the turned tile
and its mirror overlay everywhere and the wall reads the same left to right;
the bounce lines off the rails remain visible as a V.
`turned_free_interconnects.png` compares eyes / zigzag / pebbles / diamonds
this way against the rotated screenshot.

**Lattice-frame motifs.** The chart's columns run along one lattice direction
and its rows along the other (node (c,r) is chart cell ((r−c)/2, (c+r)/2) ÷
`chart cell`): *eye* is a square outline in the chart and a diamond outline on
the wall, *bricks* / *long bricks* / *cells* are rectangles in running bond
(gap 0 + stagger — the turned cross net), *diamond* a solid block, *cross* a
plus (an X on the wall), *zigzag* a staircase, *pebbles* a checker, plus
*nested eyes*, *lines*, *ladder*. At 30° the figures are tall, at 60° flat —
they stretch with the lattice. A tile motif picked here appears turned by 45°.

**Routing — edge following with the tile pickup.** Two bundles leave every
base start column, one each way (70 bundles, ~11 cables — the tile's strand).
A bundle runs straight while the node ahead is dark; where only the node across
is dark it turns; at a vertex (both dark) it turns with `turn share` (1 hugs
every side and reads as zigzags, 0 keeps long runs), otherwise the tile pickup
decides — j-th bundle of the motif tile → j-th dark node — so bundles that met
on a node part again below it instead of merging for good (measured: median
bundle stays 11 cables; a greedy nearest-dark rule merged them into 140-cable
bundles that no node could turn). Turns are still refused where the node has
no base under it — below `base ends below`, and for heavy bundles on a thin
base — so the presets keep the base at 7 % (single cables, so the mesh does not
out-draw the figures) and ~30 % of attempted turns are refused, nearly all in
the lower wall.

**Figures with a backing lattice.** The figure modes act on the pattern layer
only: *holes* reflect the pattern bundles while a single-cable base net
(`base share` 8 %) runs straight through the hole, so the hole edges are
supported and the void reads. Presets *Lattice · diamond / eye / cross holes*,
*steps (density)*; pattern presets *Lattice + eyes / zigzag / bricks / cells /
diamonds / pebbles* (lattice-frame motifs, 1 step per chart cell, base 7 %).
A heavy bundle whose turn is refused at a hole edge crosses the hole (reported
as *strands forced through a hole*).

### Figures on the lattice — what the physics allows

A figure on a uniform diagonal net needs strands to deviate at its boundary,
and every deviation is a bounce that pulls its node sideways unless a mirror
bounce of the other family happens at the same node. Three modes, all measured:

- **holes** — the net reflects off the figure like off the rails. Legible (the
  figure is a real void with lines piling along its edge), but every hole edge
  is pulled open: on the eyes preset 138 uncancelled turn nodes, worst 168 N;
  low on the wall, where strands are light, a node would shift ≈ 300 mm. Fine
  near the beam, not in the lower half. The panel shows these numbers.
- **density** — the net stays perfect; inside the figure cables drop to bulbs
  earlier (× factor). No load at all, but weak: a strand's line weight can only
  decrease along its diagonal, so the figure smears downstream and reads as a
  tone shift and a bulb-density shift (37 % of bulbs in 29 % of the wall at ×4).
- **chevrons** — inside the figure every node is a mirror: both families flip
  there, so pulls cancel, and strands zigzag in place until the figure ends.
  Balanced — and invisible: a zigzag between two columns traces exactly the
  diamond edges the crossing families already draw. Tested on the coarser
  *start every 2* mesh too: still nothing shows.

(The pure-lattice figure modes without a base remain selectable; the presets
above all use a backing lattice.) The honest summary: on an all-diagonal net, legible
figures cost edge loads; balanced figures are faint or invisible. If the
pattern must be both legible and unloaded, it belongs in the tile layout (ribs
and anchor columns) or in the bulbs.

## Layout — tile or strip

*composition* = **tile one motif across the wall** repeats a single lexicon motif
across the full width, each column shifted down by *stagger* rows, with *ground
between* plain anchor strands. Homogeneous, repetitive, anchors everywhere — the
current direction, not strictly sadu. **sadu strip** is the borders-and-centre
composition described below.

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

## Bulb layout — independent of the weave

**⚄ new bulb layout** re-draws where the bulbs are without touching the weave.
The design seed fixes how many cables leave each strand at each row and which
floats happen (the plan); the bulb seed re-decides *which* cables drop, their
tail lengths, and their **drift**: with that probability a dropping cable first
runs along the rib (a tensioned horizontal, so it can be tied anywhere along it)
up to *drift reach* cells and hangs from that point — so bulbs stop lining up
under their strands and under the grid columns. Verified: strand paths, ribs and
corners are byte-identical across bulb seeds; only cable lengths change (a drop
run is in `cables.csv` as `drop_run_mm`). Bulb x-evenness improves from CV 0.26
(no drift) to ≈ 0.20.

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

**Randomise** follows the preset dropdown. With a preset selected it randomises
**within that family**: the layout, the tile motif (or the border motifs and
centre glyphs of a strip), the grid and the rails stay; stagger, gaps, pairs per
column, chart scale, twine, γ, tails, bulb clearances, rib runs, tension and sag
vary — inside ranges measured to keep the ribs continuous (one cable per run,
runs of 6–8 cells, a new run every ⅓–½ run; two cables per run or short tight
runs deplete the strands and leave corners without a rib). Choose *— any style —*
at the top of the dropdown for the full-range draw below. Favourites and the
seen-log record the family.

**Randomise all** (any style) draws every *design* variable over its full range — grid on/off
and pitch, max run, lane offset, rows, chart scale, twine, mirroring, γ, tails,
top clearance, every weft/rib setting, borders, centre glyphs. Wall size, cable
count, Ø, g/m and bulb mass are facts and stay put.

**★ Save** (or `s`) stores the full composition, every metric and a thumbnail.
*clear saved favourites* removes them all from this browser (after a confirm —
export first); *clear seen-log* forgets the randomise history.

Snapshots of earlier versions live in `saved designs/`: `v2-field-model/` and
`v3-grid-ribs-2026-09-11/` (the grid + ribs version before the support rule).
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

Keyboard: `r` new seed · `s` save favourite · `p` polarity · `g` grid · `1`–`3` views (Weave · Bulbs · Technical).

## net12.html — standalone 12-fold cable net (no dependencies)

A fresh single-file app, independent of `sadu-weave.html`.

- **Base lattice.** 52 rows × 52 columns (13.5 cm) on a 7 × 7 m wall plus four diagonal families at ±30° and ±60° through the wall centre. Crossings closer than 1.5 cm merge into one tie point. About 15 600 nodes, 35 600 segments, 2 145 m of lattice line.
- **Bulbs.** 1000 random positions with a minimum-distance spread (best of 12 candidates). Beam anchors are 7 mm apart; anchor rank in x matches bulb rank in x.
- **Routing.** All cables have the same length. Cables travel only along lattice lines, in any direction, including upward, and never U-turn in place. They move in runs of 25–90 cm, and each change of line is a zip tie. A coarse 0.5 m density map sends each cable to reachable cells that are below target. The cable spends length there, then a bounded lattice search finds a tie point near its bulb that leaves a 5–30 cm tail.
- **Balancing and repair.** Balancing passes reroute cables near empty segments plus a random 12 %. A repair step then reroutes, through each still-empty segment, the nearby cable that has the fewest segments of its own to lose.
- **Stats.** Uncovered segments, cables per segment (min/mean/max, spread), per-direction load, per-0.5 m-band load chart, tails, zip ties, upward share, mass.
- **Export.** SVG with the lattice in blue, cables drawn thicker with load, and bulbs. Also a cables JSON with node paths, a cables CSV, and a ties CSV listing every turn tie and bulb tie per cable.
- **Result at the defaults (12 m cables, 3 bulb/routing seeds).** No segment is uncovered and no tail is longer than 30 cm. Cables per segment average 5.5 with about 38 % spread. Bands from the beam down to 6.5 m hold 5.7–6.0 cables per segment. The bottom 0.5 m thins to about 3.3, because no bulb may hang there and cables must climb back out. Vertical lines carry about 7 cables and horizontal lines about 4. Each cable has about 36 zip ties at turns. Routing takes about 27 s.
- **Routing knobs in code** (`routeAll`): pull 0.9 toward waypoints, gain weight 0.6, local spend 3.5 m per waypoint, direction balance 0.5, floor pull 1.2, 6 repair rounds. In a corner dead end a cable may turn back on its own line.
- **Why cables must be about 12 m long.** Every cable passes through the lattice segments just under the beam, 195 of them at 52 columns, so the top averages about 5 cables per segment. Even density means every segment carries about the same, so each cable needs roughly the net length divided by that top-row count. That is about 11–12 m, whatever the spacing, because a coarser net shrinks both numbers together. Checked: 52 columns 12 m, 26 columns 12 m, 52 columns with diagonals ×2 12.5 m.
- **What that means on the wall.** 12 km of 5.5 mm cable laid flat would be about 130 % of the wall area. As zip-tied round bundles it covers about 58 % at 52 columns, 49 % with sparser diagonals, and 42 % at 26 columns. A coarser lattice gives fewer, thicker bundles and more open space. Shorter cables would keep more open space too, but the top of the wall would then be denser than the bottom. `net12_compare.png` shows the three options, full wall on top and centre crops below.
- **Stored routing.** The page carries the routing for its default values, compressed inside a script tag of about 330 KB. At startup it restores that instantly when the current settings equal the defaults. Any other settings route live. After changing routing code or default values, run `node net12-bake.js net12.html` to store a fresh result. If the stored paths don't fit the lattice, the page routes live instead.
- **Bulbs never overlap.** Bulb diameter is a setting, 6 cm by default. Random bulb targets are at least 1.6 diameters apart. While routing, a tie is skipped if its bulb would come within one diameter plus 1 cm of an already placed bulb. The stats show the overlap count, which was 0 on three layouts. Hovering near a bulb draws its cable last, in red at double width.
- **Density map view.** Shows cable-metres per m² on a 5 cm grid, from segment load × length plus bulb tails. It is smoothed by an adjustable radius, 20 cm by default, and drawn in a black-to-red-to-yellow scale. The legend marks the mean and the point of 100 % flat cover, above which cables must overlap. Hovering shows the value under the mouse, and the stats list P5 / median / P95 and the spread. The hovered cable is drawn in blue with a white outline.
- **3D view.** Built on the browser's WebGL2, with no libraries. Every cable is a lit 5.5 mm tube, about 410 000 short pieces. Cables sharing a segment pack into a honeycomb bundle around the string. Each cable keeps the same spot in the bundle, set by its order along the beam. At each crossing the bundles of the different directions stack front to back in a fixed order, and ties squeeze each bundle there. Drag rotates, shift- or right-drag pans, the wheel zooms toward the mouse, and double-click resets. Hovering near a bulb shows its cable in blue at double width. A depth slider exaggerates front-to-back distance by 1–10×. "Colour each cable" gives every cable its own hue so crossings are easy to follow. The stats list stack depth at crossings (median / P95 / max), how many crossings are deeper than 5 cm, and the thickest bundle.
