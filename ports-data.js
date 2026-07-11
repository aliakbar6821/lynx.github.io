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
   5. Fill in "flashGuide" and "changelog" — these render inside
      pop-up modals on the detail page, no separate pages needed.
   6. Set "telegram" to your announcement/screenshots channel —
      the Screenshots button opens this directly.
   ============================================================ */

// Site-wide settings used inside the download/mirror reminder pop-up.
const SITE = {
  videoGuideUrl: "#",      // link to your "how to get past the download page" video
  donateUrl: "#",
  countdownSeconds: 5
};

const PORTS = [
  {
    id: "nothingos",
    name: "Nothing OS",
    tagline: "Nothing OS port with dot-matrix design.",
    description: "A ported version of Nothing OS bringing the dot-matrix design and smooth performance to your devices.",
    cover: "images/nothingos-cover.jpg",
    device: "Moto G54 / G64",
    telegram: "https://t.me/your_channel",
    flashGuide: {
      disclaimer: "I'm not responsible for bricked devices, dead SD cards, thermonuclear war, or you getting fired because the alarm app failed. Please do some research if you have any concerns about features included in this ROM before flashing it. YOU are choosing to make these modifications, and if you point the finger at me for messing up your device, I will laugh at you. Your warranty will be void if you tamper with it — that's your problem.",
      prerequisites: [
        "Unlocked Bootloader",
        "Custom Recovery (TWRP/OrangeFox)",
        "Have a brain"
      ],
      steps: [
        "Reboot to recovery.",
        "Flash the ROM zip.",
        "Format Data (type <code>yes</code>).",
        "Reboot to System."
      ],
      devNotes: "Moto G54 and G64 share the same firmware, so this same zip flashes on both. First boot can take 5–10 minutes — don't panic and don't pull the battery."
    },
    changelog: [
      {
        version: "4.1",
        date: "2026-05-15",
        changes: [
          "Rebased on the latest Android 16 QPR2 security patch",
          "Fixed camera app crashing on cold boot",
          "Improved standby battery life",
          "Updated dot-matrix icon pack"
        ]
      },
      {
        version: "4.0",
        date: "2026-05-10",
        changes: [
          "Initial stable Nothing OS 4.0 port for Moto G54 / G64",
          "Dot-matrix launcher and fonts included",
          "Working camera, fingerprint, and NFC"
        ]
      }
    ],
    releases: [
      {
        channel: "stable",
        title: "Nothing OS 4.1 - Stable",
        device: "Moto G54 / G64",
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
        device: "Moto G54 / G64",
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
        device: "Moto G54 / G64",
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
    id: "hios15",
    name: "Tecno HiOS 15",
    tagline: "HiOS 15.0.3 port with a beautiful design.",
    description: "Brings Tecno's HiOS look and feel, custom live wallpapers, and smooth animations to your device.",
    cover: "images/hios-cover.jpg",
    device: "Moto G54 / G64",
    telegram: "https://t.me/lynx_prjkt",
    flashGuide: {
      disclaimer: "I'm not responsible for bricked devices, dead SD cards, thermonuclear war, or you getting fired because the alarm app failed. Please do some research if you have any concerns about features included in this ROM before flashing it. YOU are choosing to make these modifications, and if you point the finger at me for messing up your device, I will laugh at you. Your warranty will be void if you tamper with it — that's your problem.",
      prerequisites: [
        "Unlocked Bootloader",
        "Computer access",
        "Have a brain"
      ],
      steps: [
        "Reboot to Bootloader.",
        "Extract the pory zip.",
        "Run flash.bat",
        "Follow Preferences."
        "Wait until you see Flashing complete MSG then Press any key to Reboot."
      ],
      devNotes: "Moto G54 and G64 share the same firmware, so this same zip flashes on both. First boot can take 5–10 minutes — don't panic and don't pull the battery."
    },
    changelog: [
      {
        version: "1.0",
        date: "2025-12-11",
        changes: [
          "Initial stable HiOS port for Moto G54 / G64",
          "Butterfly live wallpaper and animations working",
          "Working camera, fingerprint, and NFC"
        ]
      }
    ],
    releases: [
      {
        channel: "stable",
        title: "HiOS 15 - Stable",
        device: "Moto G54 / G64",
        android: "Android 15",
        size: "5.5 GB",
        uploaded: "2026-12-11",
        tags: ["STABLE", "X1"],
        downloadUrl: "https://sourceforge.net/projects/lynx-prjkt/files/port/Hios_15.0.3_Moto_G54.zip/download",
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
