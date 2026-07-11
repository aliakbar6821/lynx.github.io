/* ============================================================
   MODALS
   Three kinds of pop-ups, all sharing one overlay/card shell:
     - openFlashModal(portId)       "How to flash" content
     - openChangelogModal(portId)   "Changelogs" content
     - openDownloadReminder(url, kind)  countdown before Download/Mirror
   Screenshots is NOT a modal — that button just opens the port's
   telegram link directly (see port.html).
   ============================================================ */

let __countdownTimer = null;

function ensureModalRoot(){
  let root = document.getElementById('modalRoot');
  if(root) return root;
  root = document.createElement('div');
  root.id = 'modalRoot';
  document.body.appendChild(root);
  return root;
}

function closeModal(){
  const root = document.getElementById('modalRoot');
  if(!root) return;
  if(__countdownTimer){ clearInterval(__countdownTimer); __countdownTimer = null; }
  root.innerHTML = '';
  document.body.classList.remove('modal-open');
}

function openModal(innerHtml){
  const root = ensureModalRoot();
  root.innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this) closeModal()">
      <div class="modal-card">
        <button class="icon-btn ripple modal-close" onclick="closeModal()" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="modal-body">${innerHtml}</div>
      </div>
    </div>
  `;
  document.body.classList.add('modal-open');
}

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeModal();
});

/* ---------------- Flash guide ---------------- */
function openFlashModal(portId){
  const port = PORTS.find(p => p.id === portId);
  if(!port) return;
  const g = port.flashGuide;
  openModal(`
    <h2 class="modal-title">${port.name} — Flashing Guide</h2>

    <h3 class="modal-subhead">Disclaimer</h3>
    <div class="modal-callout">${g.disclaimer}</div>

    <h3 class="modal-subhead">Prerequisites</h3>
    <ul class="modal-list">
      ${g.prerequisites.map(item => `<li>${item}</li>`).join('')}
    </ul>

    <h3 class="modal-subhead">Steps</h3>
    <ol class="modal-list numbered">
      ${g.steps.map(item => `<li>${item}</li>`).join('')}
    </ol>

    <h3 class="modal-subhead">Dev Notes</h3>
    <p class="modal-text">${g.devNotes}</p>
  `);
}

/* ---------------- Changelog ---------------- */
function openChangelogModal(portId){
  const port = PORTS.find(p => p.id === portId);
  if(!port) return;
  openModal(`
    <h2 class="modal-title">${port.name} — Changelog</h2>
    ${port.changelog.map(entry => `
      <h3 class="modal-subhead">v${entry.version} <span class="modal-subhead-date">— ${entry.date}</span></h3>
      <ul class="modal-list">
        ${entry.changes.map(c => `<li>${c}</li>`).join('')}
      </ul>
    `).join('')}
  `);
}

/* ---------------- Download / mirror reminder ---------------- */
function openDownloadReminder(url, kind){
  const isMirror = kind === 'mirror';
  let seconds = SITE.countdownSeconds;

  openModal(`
    <h2 class="modal-title">Reminder</h2>
    <p class="modal-text">You are about to <strong>leave this site</strong> to ${isMirror ? 'reach the mirror' : 'download the ROM'}.</p>
    <p class="modal-text">You may need to <strong>disable Ad-block</strong> to proceed.</p>
    <p class="modal-text">If you have trouble proceeding with the link, you may watch the video guide: <a class="modal-link" href="${SITE.videoGuideUrl}" target="_blank" rel="noopener">Watch Video Guide</a></p>
    ${!isMirror ? `<p class="modal-text"><strong>DO NOT MIRROR</strong> nor <strong>SHARE</strong> the direct download link.</p>` : ''}
    <div class="modal-actions">
      <button class="btn btn-filled ripple" id="proceedBtn" disabled>Proceed (${seconds}s)</button>
      <a class="btn btn-tonal ripple" href="${SITE.donateUrl}">Support / Donate</a>
    </div>
  `);

  const btn = document.getElementById('proceedBtn');
  __countdownTimer = setInterval(() => {
    seconds -= 1;
    if(seconds <= 0){
      clearInterval(__countdownTimer);
      __countdownTimer = null;
      btn.disabled = false;
      btn.textContent = 'Proceed';
      btn.onclick = () => { window.location.href = url; };
    } else {
      btn.textContent = `Proceed (${seconds}s)`;
    }
  }, 1000);
}
