/* ============================================================
   PORT DATA
   ------------------------------------------------------------
   One object per ROM/port. Both index.html (the list) and
   port.html (the detail page, opened as port.html?id=...) read
   from this single file, so you only ever edit data in one place.

   HOW TO ADD A NEW PORT
   1. Copy a whole block below (from the opening "{" to the
      matching closing "},").
   2. Give it a unique "id" (used in the URL: port.html?id=your-id).
   3. Fill in name / tagline / description / cover image.
   4. Fill in "releases": one entry per downloadable build.
      channel is either "stable" or "pre".
   5. Save. Nothing else in the site needs to change.
   ============================================================ */

const PORTS = [
  {
    id: "nothingos",
    name: "Nothing OS",
    tagline: "Nothing OS port with dot-matrix design.",
    description: "A ported version of Nothing OS bringing the dot-matrix design and smooth performance to your devices.",
    cover: "images/nothingos-cover.jpg",
    device: "Infinix GT 10 Pro",
    links: {
      flash: "#",         // link to your flashing guide
      screenshots: "#",   // link to a screenshots page/album
      changelogs: "#"     // link to your changelog
    },
    releases: [
      {
        channel: "stable",
        title: "Nothing OS 4.1 - Stable",
        device: "Infinix GT 10 Pro",
        android: "Android 16",
        size: "3.28 GB",
        uploaded: "2026-05-15",
        tags: ["STABLE", "X2"],
        downloadUrl: "#",
        mirrorUrl: "#"
      },
      {
        channel: "stable",
        title: "Nothing OS 4.0 - Stable",
        device: "Infinix GT 10 Pro",
        android: "Android 16",
        size: "3.12 GB",
        uploaded: "2026-05-10",
        tags: ["STABLE", "X1.2"],
        downloadUrl: "#",
        mirrorUrl: "#"
      },
      {
        channel: "pre",
        title: "Nothing OS 4.0 - Pre-Release 1",
        device: "Infinix GT 10 Pro",
        android: "Android 16",
        size: "3.68 GB",
        uploaded: "2026-04-04",
        tags: ["PRE", "X1"],
        downloadUrl: "#"
        // no mirrorUrl -> Mirror button is simply not shown
      }
    ]
  },
  {
    id: "hyperos2",
    name: "Xiaomi HyperOS 2",
    tagline: "HyperOS 2 port with a butterfly-themed design.",
    description: "Brings Xiaomi's HyperOS 2 look and feel, custom live wallpapers, and smooth animations to your device.",
    cover: "images/hyperos2-cover.jpg",
    device: "Infinix GT 10 Pro",
    links: {
      flash: "#",
      screenshots: "#",
      changelogs: "#"
    },
    releases: [
      {
        channel: "stable",
        title: "HyperOS 2 - Stable",
        device: "Infinix GT 10 Pro",
        android: "Android 15",
        size: "3.85 GB",
        uploaded: "2026-06-01",
        tags: ["STABLE", "X1"],
        downloadUrl: "#",
        mirrorUrl: "#"
      }
    ]
  }
];

/* ------------------------------------------------------------
   Helper used by both pages — figures out a port's overall
   status (shown as the badge on the list card) from whichever
   release was uploaded most recently.
   ------------------------------------------------------------ */
function latestRelease(port) {
  return [...port.releases].sort((a, b) => (a.uploaded < b.uploaded ? 1 : -1))[0];
}
