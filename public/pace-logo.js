/* PACE 2027 logo — text wordmark (no graduation cap) */

/** NxtWave Academy text lockup — no image, no background box */
function nxtwaveAcademyHtml(extraClass) {
  var cls = 'pace-nxtwave-lockup' + (extraClass ? ' ' + extraClass : '');
  return (
    '<span class="' + cls + '" aria-label="NxtWave Academy">' +
    '<span class="pace-nxtwave-line pace-nxtwave-line-sm">NxtWave</span>' +
    '<span class="pace-nxtwave-line pace-nxtwave-line-lg">ACADEMY</span>' +
    '</span>'
  );
}

window.NXTWAVE_LOGO_SVG = nxtwaveAcademyHtml();

window.renderPaceLogo = function (opts) {
  opts = opts || {};
  var cls = 'pace-logo' + (opts.compact ? ' pace-logo-sm' : '') + (opts.stack ? ' pace-logo-stack' : '');
  var href = opts.href != null ? opts.href : '/';
  var target = opts.target ? ' target="' + opts.target + '"' : '';
  var showAcademy = opts.academy === true;
  var academy =
    showAcademy
      ? '<span class="pace-logo-divider" aria-hidden="true"></span>' +
        NXTWAVE_LOGO_SVG
      : '';
  var inner =
    '<span class="pace-logo-row">' +
    '<span class="pace-logo-text">PACE</span>' +
    (opts.hideYear ? '' : '<span class="pace-logo-year">2027</span>') +
    '</span>' +
    academy;
  if (opts.stack && opts.elaboration !== false) {
    inner += '<span class="pace-logo-elab">Placement Acceleration &amp; Career Excellence</span>';
  }
  return '<a href="' + href + '" class="' + cls + '"' + target + '>' + inner + '</a>';
};

/** Hero sub-brand: PACE × NxtWave Academy — highlighted, no cap */
window.renderHeroBrandRow = function () {
  return (
    '<div class="hero-brand-highlight">' +
    '<span class="hero-pace-small">PACE</span>' +
    '<span class="hero-brand-x" aria-hidden="true">×</span>' +
    NXTWAVE_LOGO_SVG +
    '</div>'
  );
};
