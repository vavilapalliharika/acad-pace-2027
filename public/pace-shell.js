/* Shared PACE app shell HTML — inject via pace-shell.html pattern */
window.PACE_SHELL_HTML = function () {
  var logo = typeof renderPaceLogo === 'function' ? renderPaceLogo({ compact: true, href: '/' }) : '<div class="pace-brand">PACE <span>2027</span></div>';
  return (
    '<div class="pace-overlay" id="pace-overlay" aria-hidden="true"></div>' +
    '<aside class="pace-sidebar" id="pace-sidebar">' +
    '<div class="pace-brand">' + logo + '</div>' +
    '<a href="/" target="_top" class="pace-home-link">← Back to home</a>' +
    '<div class="pace-profile">' +
    '<div class="pace-profile-name" id="pace-profile-name">Student</div>' +
    '<span class="pace-profile-badge" id="pace-profile-badge">YOG</span></div>' +
    '<nav class="pace-nav" id="rise-nav" aria-label="Main navigation"></nav>' +
    '<div class="pace-sb-footer">PACE 2027 · Batch 2027 YOG</div></aside>'
  );
};

window.wrapPaceMain = function () {
  var main = document.querySelector('.main');
  if (!main || document.querySelector('.pace-app')) return;
  var app = document.createElement('div');
  app.className = 'pace-app';
  app.innerHTML = PACE_SHELL_HTML();
  document.body.insertBefore(app, document.body.firstChild);
  app.appendChild(main);
  var topLogo = typeof renderPaceLogo === 'function' ? renderPaceLogo({ compact: true, href: '/', hideYear: true }) : '<span class="pace-brand">PACE <span>2027</span></span>';
  main.insertAdjacentHTML(
    'afterbegin',
    '<div class="pace-topbar"><button type="button" class="pace-menu-btn" id="pace-menu-btn" aria-label="Open menu">☰</button>' +
      topLogo + '</div>'
  );
  var oldSidebar = document.querySelector('.sidebar');
  if (oldSidebar) oldSidebar.remove();
  main.classList.add('pace-main');
};
