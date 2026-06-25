/* Shared sidebar navigation for RISE 2027 static pages */
window.RISE_NAV_ITEMS = [
  { href: '/dashboard', icon: '⊞', label: 'Dashboard', key: 'dashboard' },
  { href: '/track/dsa', icon: '</>', label: 'DSA Track', key: 'dsa' },
  { href: '/levels', icon: '◈', label: 'Levels', key: 'levels' },
  { href: '/connectors', icon: '🔗', label: 'Connectors', key: 'connectors' },
  { href: '/placement-readiness', icon: '🚀', label: 'Placement Readiness', key: 'placement' },
  { href: '#', icon: '🏆', label: 'Leaderboard', key: 'leaderboard', plain: true },
  { href: '#', icon: '🤖', label: 'Mock Interviews', key: 'mock', plain: true },
  { href: '#', icon: '🎁', label: 'Rewards', key: 'rewards', plain: true },
  { href: '#', icon: '👤', label: 'Profile', key: 'profile', plain: true },
];

window.renderRiseNav = function (activeKey, container) {
  const el = typeof container === 'string' ? document.getElementById(container) : container;
  if (!el) return;
  el.innerHTML =
    RISE_NAV_ITEMS.map((item) => {
      const act = item.key === activeKey ? ' active' : '';
      const icon = item.icon.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      if (item.plain) {
        return `<div class="nav-item"><span class="nic">${icon}</span> ${item.label}</div>`;
      }
      return `<a href="${item.href}" target="_top" class="nav-item${act}"><span class="nic">${icon}</span> ${item.label}</a>`;
    }).join('') +
    `<a href="#" onclick="sessionStorage.removeItem('rise_user');top.location.href='/login';return false;" class="nav-item"><span class="nic">⎋</span> Sign out</a>`;
};

window.riseAuthGate = function () {
  try {
    if (!sessionStorage.getItem('rise_user')) {
      window.top.location.replace('/login?next=' + encodeURIComponent(window.top.location.pathname));
    }
  } catch (e) {}
};
