/* PACE 2027 — shared sidebar navigation */
window.RISE_NAV_ITEMS = [
  { href: '/dashboard', icon: '◫', label: 'Dashboard', key: 'dashboard' },
  { href: '/placement-readiness', icon: '◎', label: 'Placement Readiness', key: 'placement' },
  { href: '/connectors', icon: '⛓', label: 'Connectors', key: 'connectors' },
  { href: '/levels', icon: '◈', label: 'Levels', key: 'levels' },
  { href: '/track/ai', icon: '🤖', label: 'AI Track', key: 'ai' },
  { href: '/track/dsa', icon: '</>', label: 'DSA Track', key: 'dsa' },
  { href: '/track/oss', icon: '★', label: 'Open Source Track', key: 'oss' },
  { href: '/track/aptitude', icon: '∑', label: 'Quant & Aptitude Track', key: 'aptitude' },
  { href: '/track/dev', icon: '⚙', label: 'Development & System Design', key: 'dev' },
  { href: '/leaderboard', icon: '🏆', label: 'Leaderboard', key: 'leaderboard' },
  { href: '/announcements', icon: '📣', label: 'Announcements', key: 'announcements' },
];

window.renderRiseNav = function (activeKey, container) {
  const el = typeof container === 'string' ? document.getElementById(container) : container;
  if (!el) return;

  const items = RISE_NAV_ITEMS.map(function (item) {
    const act = item.key === activeKey ? ' active' : '';
    const icon = item.icon.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return (
      '<a href="' +
      item.href +
      '" target="_top" class="pace-nav-item' +
      act +
      '">' +
      '<span class="pace-nav-icon">' +
      icon +
      '</span>' +
      item.label +
      '</a>'
    );
  }).join('');

  el.innerHTML =
    items +
    '<div class="pace-nav-divider"></div>' +
    '<a href="#" class="pace-nav-item pace-nav-signout" onclick="paceSignOut();return false;">' +
    '<span class="pace-nav-icon">⎋</span> Sign Out</a>';
};

window.riseAuthGate = function () {
  try {
    if (!sessionStorage.getItem('rise_user')) {
      window.top.location.replace('/login?next=' + encodeURIComponent(window.top.location.pathname));
      return;
    }
    syncPaceSession();
  } catch (e) {}
};

window.paceSignOut = function () {
  sessionStorage.removeItem('rise_user');
  window.top.location.href = '/login';
};

/** Canonical demo student — single source of truth for the portal */
window.getPaceStudentProfile = function () {
  var s = (window.PLACEMENT_ENGINE && PLACEMENT_ENGINE.student) || {};
  var tierName = s.eligibleTier || s.tier || 'Type B';
  var tierRange = s.eligibleRange || '8–12 LPA';
  return {
    name: s.name || 'Harika Vavilapalli',
    email: 'student@rise2027.com',
    level: s.level || 40,
    badge: s.badge || 'YOG',
    batch: s.batch || '2027 YOG',
    eligibleTier: tierName,
    eligibleRange: tierRange,
    tierLabel: tierName + ' · ' + tierRange,
  };
};

/** Resolve tier label for sidebar & hero — uses student profile, not computed signals */
window.getPaceTierLabel = function (profile) {
  profile = profile || getPaceStudentProfile();
  return profile.eligibleTier + ' · ' + profile.eligibleRange;
};

/** Keep sessionStorage in sync (fixes stale "Ananya Rao" from older logins) */
window.syncPaceSession = function () {
  var profile = getPaceStudentProfile();
  try {
    var raw = sessionStorage.getItem('rise_user');
    var user = raw ? JSON.parse(raw) : {};
    var next = {
      name: profile.name,
      email: user.email || profile.email,
      level: profile.level,
      badge: profile.badge,
      batch: profile.batch,
      eligibleTier: profile.eligibleTier,
      eligibleRange: profile.eligibleRange,
    };
    if (
      !raw ||
      user.name !== next.name ||
      user.level !== next.level ||
      user.badge !== next.badge ||
      user.batch !== next.batch
    ) {
      sessionStorage.setItem('rise_user', JSON.stringify(next));
    }
    return next;
  } catch (e) {
    sessionStorage.setItem('rise_user', JSON.stringify(profile));
    return profile;
  }
};

window.getPaceUser = function () {
  var profile = getPaceStudentProfile();
  try {
    var raw = sessionStorage.getItem('rise_user');
    if (!raw) return profile;
    var user = JSON.parse(raw);
    return Object.assign({}, profile, user, {
      batch: user.batch || profile.batch,
      eligibleTier: user.eligibleTier || profile.eligibleTier,
      eligibleRange: user.eligibleRange || profile.eligibleRange,
    });
  } catch (e) {
    return profile;
  }
};

window.applyPaceProfile = function (profile) {
  profile = profile || getPaceUser();
  var initials = profile.name
    .split(' ')
    .map(function (n) {
      return n[0];
    })
    .join('')
    .slice(0, 2)
    .toUpperCase();

  var nameEls = document.querySelectorAll(
    '#pace-profile-name, #hero-name, .sb-name, [data-pace-name]'
  );
  nameEls.forEach(function (el) {
    el.textContent = profile.name;
  });

  var tierLabel = getPaceTierLabel(profile);
  var batchLabel = profile.batch.indexOf('Batch') === 0 ? profile.batch : 'Batch ' + profile.batch;

  var badgeText = tierLabel;
  var badgeEls = document.querySelectorAll(
    '#pace-profile-badge, .sb-badge, [data-pace-badge]'
  );
  badgeEls.forEach(function (el) {
    el.textContent = badgeText;
  });

  var avatar = document.getElementById('hero-avatar');
  if (avatar) avatar.textContent = initials;

  var tierEl = document.getElementById('hero-tier') || document.getElementById('hero-level');
  if (tierEl) tierEl.textContent = tierLabel;

  var batchEl = document.getElementById('hero-batch');
  if (batchEl) batchEl.textContent = batchLabel;

  var badgeTag = document.getElementById('hero-badge');
  if (badgeTag) badgeTag.style.display = 'none';
};

window.initPaceShell = function (activeKey) {
  riseAuthGate();
  syncPaceSession();
  renderRiseNav(activeKey, 'rise-nav');
  applyPaceProfile();

  var menuBtn = document.getElementById('pace-menu-btn');
  var sidebar = document.getElementById('pace-sidebar');
  var overlay = document.getElementById('pace-overlay');
  if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
    overlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }
};

window.initPaceReveal = function (selector) {
  var sel = selector || '.pace-reveal';
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll(sel).forEach(function (el) {
    obs.observe(el);
  });
};

window.paceCountUp = function (el, to, dur, suffix) {
  if (!el) return;
  var start = performance.now();
  suffix = suffix || '';
  function step(now) {
    var t = Math.min((now - start) / (dur || 1000), 1);
    var ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    el.textContent = Math.round(to * ease).toLocaleString() + suffix;
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = to.toLocaleString() + suffix;
  }
  requestAnimationFrame(step);
};

window.renderPaceRing = function (pct, size, color, label) {
  size = size || 96;
  color = color || '#14b8a6';
  var sw = 7;
  var r = (size - sw) / 2;
  var circ = 2 * Math.PI * r;
  var offset = circ - (Math.min(100, Math.max(0, pct)) / 100) * circ;
  var text = label != null ? label : pct + '%';
  return (
    '<div class="pace-ring" data-pct="' +
    pct +
    '">' +
    '<svg width="' +
    size +
    '" height="' +
    size +
    '" viewBox="0 0 ' +
    size +
    ' ' +
    size +
    '">' +
    '<circle class="pace-ring-bg" cx="' +
    size / 2 +
    '" cy="' +
    size / 2 +
    '" r="' +
    r +
    '" fill="none" stroke-width="' +
    sw +
    '"/>' +
    '<circle class="pace-ring-fill" cx="' +
    size / 2 +
    '" cy="' +
    size / 2 +
    '" r="' +
    r +
    '" fill="none" stroke="' +
    color +
    '" stroke-width="' +
    sw +
    '" stroke-linecap="round" stroke-dasharray="' +
    circ +
    '" stroke-dashoffset="' +
    circ +
    '" data-offset="' +
    offset +
    '" transform="rotate(-90 ' +
    size / 2 +
    ' ' +
    size / 2 +
    ')"/>' +
    '<text x="' +
    size / 2 +
    '" y="' +
    size / 2 +
    '" text-anchor="middle" dominant-baseline="central" fill="#f8fafc" font-size="' +
    (size > 80 ? 15 : 12) +
    '" font-weight="800" font-family="Inter,sans-serif">' +
    text +
    '</text></svg></div>'
  );
};

window.animatePaceRings = function () {
  document.querySelectorAll('.pace-ring-fill').forEach(function (c) {
    var off = c.getAttribute('data-offset');
    if (off != null) c.style.strokeDashoffset = off;
  });
};
