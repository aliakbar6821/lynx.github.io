# Lynx-prjkt — site files

Six files, upload all of them to your GitHub Pages repo root:

- **index.html** — the main page. Lists every port as a card. There's no
  device filter — everything on the site targets Moto G54 / G64 (same
  firmware, same zip for both).
- **port.html** — the detail page for one port. It's a single template
  that renders differently depending on the URL: `port.html?id=nothingos`,
  `port.html?id=hyperos2`, etc.
- **ports-data.js** — all your content: names, descriptions, cover images,
  download links, flash-guide text, changelog entries, Telegram link.
  Both HTML files read from this one file.
- **style.css** — the Material You look (colors, buttons, cards, modals)
  shared by both pages.
- **theme.js** — the light/dark toggle and the button ripple effect,
  shared by both pages.
- **modals.js** — the three pop-ups (How to flash, Changelogs,
  Download/Mirror reminder). Used only on `port.html`.
- **images/** — cover art.

## How the files talk to each other

Nothing is duplicated between pages — each file has one job:

```
index.html  ──┐
              ├──> style.css      (shared look, incl. modal styling)
port.html   ──┼──> theme.js       (shared dark/light toggle)
              ├──> modals.js      (pop-ups — port.html only)
              └──> ports-data.js  (shared content)
```

- `index.html` and `port.html` both `<link>` to `style.css` and load
  `theme.js` — edit either file once and both pages update.
- Both pages load `ports-data.js`. `index.html` loops over the whole
  `PORTS` array to build the card grid. `port.html` reads `id` from its
  own URL (`?id=nothingos`) and pulls just that one port out of the same
  array.
- `port.html` additionally loads `modals.js`, which supplies the pop-up
  functions called from its buttons — `openFlashModal()`,
  `openChangelogModal()`, `openDownloadReminder()`.
- Clicking a card on `index.html` is just a link:
  `<a href="port.html?id=nothingos">`. There's no server involved — the
  `id` in the address bar is how `port.html` knows which ROM to display.

Because of this split, you never edit HTML to add content — you only
ever touch `ports-data.js`.

## The three pop-ups

All defined in `modals.js`, styled in `style.css` under `/* Modals */`.

- **How to flash** → `openFlashModal(portId)`. Renders the port's
  `flashGuide` object: `disclaimer`, `prerequisites` (list),
  `steps` (numbered list), `devNotes`.
- **Changelogs** → `openChangelogModal(portId)`. Renders the port's
  `changelog` array — one heading + bullet list per version.
- **Screenshots** is *not* a pop-up — it's a plain link straight to the
  port's `telegram` URL, opened in a new tab.
- **Download / Mirror** → `openDownloadReminder(url, kind)`. Shows the
  "you're about to leave this site" reminder with a countdown. The
  "Proceed" button is disabled until the countdown (`SITE.countdownSeconds`
  in `ports-data.js`, default 5s) finishes, then becomes clickable and
  sends the visitor to `url`.

## Adding or editing a port

Open `ports-data.js`. Copy an existing block inside the `PORTS` array:

1. Give it a unique `id` — this becomes the URL: `port.html?id=your-id`.
2. Set `name`, `tagline` (card blurb), `description` (detail page blurb),
   `cover`, `device`, `telegram`.
3. Fill in `flashGuide` (disclaimer / prerequisites / steps / devNotes)
   and `changelog` (array of `{ version, date, changes[] }`).
4. Add one object per downloadable build inside `releases`. `channel` is
   `"stable"` or `"pre"` — controls which section and badge color it gets.

`SITE` (top of the file) holds site-wide settings used by the download
reminder pop-up: `videoGuideUrl`, `donateUrl`, `countdownSeconds`.

## Theme (black or white)

The circular icon button in the header toggles between a true dark theme
and a clean light theme; the choice is saved (`localStorage`) so it's
remembered next visit and stays in sync across both pages. All the colors
live at the top of `style.css` under `:root` (light) and
`[data-theme="dark"]`.

## Cover images

`images/nothingos-cover.jpg` and `images/hyperos2-cover.jpg` are
solid-color placeholders. Replace them with real art (same filenames, or
update the `cover` path in `ports-data.js`). 16:10 works best with the
card layout.

## Ad slots

Both pages include the AdSense loader in `<head>` and a dashed placeholder
`<div class="ad-slot">` — one on the main page, one on the detail page
between the action buttons and the download list. Once approved:

1. Replace `ca-pub-XXXXXXXXXXXXXXXX` in both files with your real publisher ID.
2. Add `ads.txt` at the repo root: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
3. Swap the `ad-slot` div(s) for the `<ins class="adsbygoogle">` snippet AdSense gives you.
