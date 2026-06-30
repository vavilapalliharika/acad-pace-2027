/* Placement Readiness & Eligibility Engine — shared mock data */
window.PLACEMENT_ENGINE = {
  student: {
    name: 'Harika Vavilapalli',
    batch: '2027 YOG',
    level: 40,
    levelName: 'Elite',
    badge: 'YOG',
    tier: 'Pro',
    eligibleTier: 'Pro',
    eligibleRange: '8–12 LPA',
    squad: 'Squad Alpha-7',
    mentor: 'Ravi Kumar',
    profileStrength: 82,
    paceScore: 3840,
    streak: 37,
    rank: 8,
    leetcode: { solved: 142, target: 200, easy: 48, medium: 72, hard: 22 },
    placementReadiness: 50,
    problems: { total: 147, easy: 52, medium: 78, hard: 17 },
  },

  tiers: [
    {
      key: 'A',
      icon: '👑',
      name: 'Legend',
      range: '12+ LPA',
      color: '#7C3AED',
      signals: [
        { id: 'lc', name: 'LeetCode Problems', current: 18, required: 20, unit: 'problems' },
        { id: 'gsoc', name: 'GSoC / Similar Competitions', current: 0, required: 1, unit: 'appeared', boolean: true },
        { id: 'oss', name: 'Open Source Contribution', current: 0, required: 1, unit: 'approved PR', boolean: true },
        { id: 'assess', name: 'Assessments Cleared', current: 3, required: 5, unit: 'assessments' },
        { id: 'intern', name: 'Internship Experience', current: 0, required: 1, unit: 'internship', alt: 'Freelancing Experience' },
        { id: 'gh', name: 'GitHub Repositories', current: 4, required: 7, unit: 'repos' },
        { id: 'interviews', name: 'Interviews Attended', current: 2, required: 3, unit: 'interviews' },
      ],
    },
    {
      key: 'B',
      icon: '⚡',
      name: 'Pro',
      range: '8–12 LPA',
      color: '#2D8C6A',
      signals: [
        { id: 'lc', name: 'LeetCode Problems', current: 18, required: 15, unit: 'problems' },
        { id: 'assess', name: 'Assessments Cleared', current: 3, required: 3, unit: 'assessments' },
        { id: 'gh', name: 'GitHub Repositories', current: 4, required: 3, unit: 'repos' },
        { id: 'proj', name: 'Full-Stack Project', current: 1, required: 1, unit: 'project', boolean: true },
        { id: 'apt', name: 'Aptitude Modules', current: 3, required: 3, unit: 'modules' },
      ],
    },
    {
      key: 'C',
      icon: '🌱',
      name: 'Rookie',
      range: 'Below 8 LPA',
      color: '#3B82F6',
      signals: [
        { id: 'lc', name: 'LeetCode Problems', current: 18, required: 10, unit: 'problems' },
        { id: 'assess', name: 'Assessments Cleared', current: 3, required: 2, unit: 'assessments' },
        { id: 'gh', name: 'GitHub Repositories', current: 4, required: 1, unit: 'repos' },
      ],
    },
  ],
};

window.getSignalStatus = function (signal) {
  if (signal.boolean) {
    return signal.current >= signal.required ? 'done' : signal.current > 0 ? 'progress' : 'todo';
  }
  if (signal.current >= signal.required) return 'done';
  if (signal.current > 0) return 'progress';
  return 'todo';
};

window.getTierEligibility = function (tier) {
  const results = tier.signals.map((s) => ({
    ...s,
    status: getSignalStatus(s),
    remaining: Math.max(0, s.required - s.current),
  }));
  const done = results.filter((r) => r.status === 'done').length;
  const pct = Math.round((done / results.length) * 100);
  const missing = results.filter((r) => r.status !== 'done').length;
  return { results, pct, missing, eligible: pct === 100 };
};

window.PACE_TIER_LEGACY = {
  'Type A': 'Legend',
  'Type B': 'Pro',
  'Type C': 'Rookie',
};

window.normalizeTierName = function (name) {
  return PACE_TIER_LEGACY[name] || name;
};

window.getCurrentEligibleTier = function () {
  const s = PLACEMENT_ENGINE.student;
  if (s.eligibleTier) {
    const normalized = normalizeTierName(s.eligibleTier);
    const matched = PLACEMENT_ENGINE.tiers.find(function (t) {
      return t.name === normalized;
    });
    if (matched) return matched;
  }
  const tiers = PLACEMENT_ENGINE.tiers;
  for (let i = 0; i < tiers.length; i++) {
    if (getTierEligibility(tiers[i]).eligible) return tiers[i];
  }
  return tiers[tiers.length - 1];
};

/** Profile / UI display tier (canonical student eligibility) */
window.getDisplayEligibleTier = function () {
  return getCurrentEligibleTier();
};

const CHECKLIST_SIGNAL_PTS = {
  lc: 80,
  gsoc: 200,
  oss: 150,
  assess: 100,
  intern: 250,
  gh: 60,
  proj: 180,
  apt: 120,
  interviews: 150,
};

window.getChecklistActionText = function (r) {
  const n = r.remaining;
  const actions = {
    lc: function () {
      return 'Solve ' + n + ' more LeetCode problem' + (n === 1 ? '' : 's');
    },
    gsoc: function () {
      return 'Participate in GSoC or a similar coding competition';
    },
    oss: function () {
      return 'Get ' + (n === 1 ? '1 approved open-source PR' : n + ' approved open-source PRs');
    },
    assess: function () {
      return 'Clear ' + n + ' more assessment' + (n === 1 ? '' : 's');
    },
    intern: function () {
      return n === 1 ? 'Complete an internship or freelancing experience' : 'Complete ' + n + ' internships';
    },
    gh: function () {
      return 'Add ' + n + ' more GitHub repo' + (n === 1 ? '' : 's');
    },
    interviews: function () {
      return 'Attend ' + n + ' more mock interview' + (n === 1 ? '' : 's');
    },
    proj: function () {
      return 'Ship ' + (n === 1 ? '1 full-stack project' : n + ' full-stack projects');
    },
    apt: function () {
      return 'Complete ' + n + ' aptitude module' + (n === 1 ? '' : 's');
    },
  };
  if (actions[r.id]) return actions[r.id]();
  return r.name + ' — ' + getSignalRemainingText(r);
};

window.getMissingChecklistItems = function () {
  const items = [];
  const seen = new Set();
  PLACEMENT_ENGINE.tiers.forEach(function (tier) {
    getTierEligibility(tier).results
      .filter(function (r) { return r.status !== 'done'; })
      .forEach(function (r) {
        if (seen.has(tier.key + '-' + r.id)) return;
        seen.add(tier.key + '-' + r.id);
        const unitPts = CHECKLIST_SIGNAL_PTS[r.id] || 100;
        const pts = r.boolean ? unitPts : unitPts * Math.max(1, r.remaining);
        items.push({
          id: tier.key + '-' + r.id,
          signalId: r.id,
          name: r.name,
          action: getChecklistActionText(r),
          progress: r.current + '/' + r.required,
          tier: tier.name,
          tierKey: tier.key,
          pts: pts,
          href: getSignalActionHref(r.id),
        });
      });
  });
  return items;
};

window.getChecklistStorageKey = function () {
  return 'pace_pr_checklist_v1';
};

window.loadChecklistState = function () {
  try {
    return JSON.parse(localStorage.getItem(getChecklistStorageKey()) || '{}');
  } catch (e) {
    return {};
  }
};

window.saveChecklistState = function (state) {
  try {
    localStorage.setItem(getChecklistStorageKey(), JSON.stringify(state));
  } catch (e) {}
};

window.calcChecklistScore = function (state) {
  state = state || loadChecklistState();
  const items = getMissingChecklistItems();
  let bonusPts = 0;
  let checked = 0;
  items.forEach(function (item) {
    if (state[item.id]) {
      bonusPts += item.pts;
      checked++;
    }
  });
  const basePct = getPlacementScore();
  const bonusPct = Math.min(35, Math.round(bonusPts / 40));
  const totalPct = Math.min(100, basePct + bonusPct);
  const paceBase = PLACEMENT_ENGINE.student.paceScore || 3840;
  return {
    basePct: basePct,
    bonusPts: bonusPts,
    bonusPct: bonusPct,
    totalPct: totalPct,
    paceTotal: paceBase + bonusPts,
    checked: checked,
    total: items.length,
  };
};

window.getPlacementScore = function () {
  const a = getTierEligibility(PLACEMENT_ENGINE.tiers[0]);
  const b = getTierEligibility(PLACEMENT_ENGINE.tiers[1]);
  return Math.round((a.pct * 0.5 + b.pct * 0.3 + 100 * 0.2));
};

window.getRecommendations = function (limit) {
  return getActionRecommendations().slice(0, limit || 8);
};

window.getImpactLevel = function (pct) {
  if (pct >= 12) return { label: 'HIGH IMPACT', cls: 'impact-high', emoji: '🔥' };
  if (pct >= 8) return { label: 'MEDIUM IMPACT', cls: 'impact-medium', emoji: '🚀' };
  return { label: 'LOW IMPACT', cls: 'impact-low', emoji: '⭐' };
};

window.getActionRecommendations = function () {
  const tierA = PLACEMENT_ENGINE.tiers[0];
  const elig = getTierEligibility(tierA);
  const signalMap = Object.fromEntries(elig.results.map((r) => [r.id, r]));

  const templates = [
    {
      id: 'intern',
      signalId: 'intern',
      title: 'Internship Readiness',
      icon: '💼',
      desc: (s) =>
        `Complete internship preparation milestones to satisfy Legend tier experience requirements.`,
      progressLabel: (s) => `${s.current} / ${s.required} Experience Signal`,
      impact: 20,
      cta: 'Apply Internships',
      href: '#internships',
    },
    {
      id: 'oss',
      signalId: 'oss',
      title: 'Open Source Contribution',
      icon: '⌥',
      desc: (s) => `Get ${s.remaining} approved pull request${s.remaining > 1 ? 's' : ''} to complete the OSS requirement.`,
      progressLabel: (s) => `${s.current} / ${s.required} Approved PR`,
      impact: 15,
      cta: 'Explore OSS',
      href: '/track/oss',
    },
    {
      id: 'gh',
      signalId: 'gh',
      title: 'GitHub Projects',
      icon: '🐙',
      desc: (s) =>
        `Need ${s.remaining} more repositor${s.remaining > 1 ? 'ies' : 'y'} to satisfy Legend tier eligibility requirements.`,
      progressLabel: (s) => `${s.current} / ${s.required} Repositories`,
      impact: 12,
      cta: 'View Projects',
      href: '/track/dev',
    },
    {
      id: 'assess',
      signalId: 'assess',
      title: 'Assessments',
      icon: '📝',
      desc: (s) =>
        `Clear ${s.remaining} additional assessment${s.remaining > 1 ? 's' : ''} to improve placement readiness.`,
      progressLabel: (s) => `${s.current} / ${s.required} Assessments`,
      impact: 10,
      cta: 'Take Assessment',
      href: '/track/aptitude',
    },
    {
      id: 'lc',
      signalId: 'lc',
      title: 'LeetCode Practice',
      icon: '💻',
      desc: (s) =>
        `Solve ${s.remaining} more LeetCode problem${s.remaining > 1 ? 's' : ''} to unlock the next eligibility checkpoint.`,
      progressLabel: (s) => `${s.current} / ${s.required} Problems`,
      impact: 8,
      cta: 'Solve Problems',
      href: '/track/dsa',
    },
    {
      id: 'gsoc',
      signalId: 'gsoc',
      title: 'Coding Contests',
      icon: '🏁',
      desc: () => `Participate in 1 coding contest to satisfy competition eligibility.`,
      progressLabel: (s) => `${s.current} / ${s.required} Contest`,
      impact: 7,
      cta: 'View Contests',
      href: '#contests',
    },
    {
      id: 'mock',
      title: 'Mock Interview',
      icon: '🤖',
      current: 1,
      required: 3,
      desc: () => `Complete your next AI Mock Interview to strengthen interview readiness.`,
      progressLabel: (s) => `${s.current} / ${s.required} Interviews`,
      impact: 6,
      cta: 'Start Interview',
      href: '#mock-interviews',
      standalone: true,
    },
    {
      id: 'aptitude',
      title: 'Aptitude Preparation',
      icon: '🎓',
      current: 2,
      required: 3,
      desc: () => `Complete the pending aptitude modules to round out your placement profile.`,
      progressLabel: (s) => `${s.current} / ${s.required} Modules`,
      impact: 5,
      cta: 'Practice Aptitude',
      href: '/track/aptitude',
      standalone: true,
    },
  ];

  const actions = templates
    .map((t) => {
      let current, required, remaining, status;
      if (t.standalone) {
        current = t.current;
        required = t.required;
        remaining = Math.max(0, required - current);
        status = current >= required ? 'done' : current > 0 ? 'progress' : 'todo';
      } else {
        const s = signalMap[t.signalId];
        if (!s || s.status === 'done') return null;
        current = s.current;
        required = s.required;
        remaining = s.remaining;
        status = s.status;
      }
      const pct = required > 0 ? Math.round((current / required) * 100) : 0;
      const completion = required > 0 ? current / required : 0;
      const impactLevel = getImpactLevel(t.impact);
      return {
        id: t.id,
        title: t.title,
        icon: t.icon,
        description: typeof t.desc === 'function' ? t.desc({ current, required, remaining, status }) : t.desc,
        current,
        required,
        remaining,
        pct,
        completion,
        progressLabel:
          typeof t.progressLabel === 'function'
            ? t.progressLabel({ current, required, remaining, status })
            : t.progressLabel,
        impact: t.impact,
        impactLevel,
        cta: t.cta,
        href: t.href,
      };
    })
    .filter(Boolean);

  return actions.sort((a, b) => {
    if (b.impact !== a.impact) return b.impact - a.impact;
    return b.completion - a.completion;
  });
};

window.statusLabel = function (status) {
  if (status === 'done') return { icon: '✔', label: 'Completed', cls: 'st-done' };
  if (status === 'progress') return { icon: '🟡', label: 'In Progress', cls: 'st-progress' };
  return { icon: '🔴', label: 'Not Started', cls: 'st-todo' };
};

/** Dashboard / app links for tier requirement signals */
window.SIGNAL_ACTION_LINKS = {
  lc: { href: '/track/dsa', label: 'DSA Track' },
  gsoc: { href: '/track/oss', label: 'Open Source Track' },
  oss: { href: '/track/oss', label: 'Open Source Track' },
  assess: { href: '/track/aptitude', label: 'Quant & Aptitude Track' },
  intern: { href: '/track/dev', label: 'Development & System Design' },
  gh: { href: '/connectors', label: 'Connectors' },
  interviews: { href: '/track/ai', label: 'AI Track' },
  proj: { href: '/track/dev', label: 'Development & System Design' },
  apt: { href: '/track/aptitude', label: 'Quant & Aptitude Track' },
};

window.getSignalActionHref = function (signalId) {
  const link = SIGNAL_ACTION_LINKS[signalId];
  return link ? link.href : '/dashboard';
};

window.formatSignalCurrent = function (r) {
  return String(r.current);
};

window.getSignalRemainingText = function (r) {
  if (r.status === 'done') return '—';
  const n = r.remaining;
  const copy = {
    lc: function () { return n + ' problem' + (n === 1 ? '' : 's') + ' left'; },
    gsoc: function () { return (n === 1 ? '1 contest entry' : n + ' contest entries') + ' left'; },
    oss: function () { return (n === 1 ? '1 approved PR' : n + ' approved PRs') + ' left'; },
    assess: function () { return n + ' assessment' + (n === 1 ? '' : 's') + ' left'; },
    intern: function () { return (n === 1 ? '1 internship' : n + ' internships') + ' left'; },
    gh: function () { return n + ' repo' + (n === 1 ? '' : 's') + ' left'; },
    interviews: function () { return n + ' interview' + (n === 1 ? '' : 's') + ' left'; },
    proj: function () { return (n === 1 ? '1 project' : n + ' projects') + ' left'; },
    apt: function () { return n + ' module' + (n === 1 ? '' : 's') + ' left'; },
  };
  if (copy[r.id]) return copy[r.id]();
  const unit = r.unit || 'item';
  return n + ' ' + unit + (n === 1 ? '' : 's') + ' left';
};

window.formatSignalRemaining = function (r) {
  if (r.status === 'done') return '—';
  const href = getSignalActionHref(r.id);
  const label = getSignalRemainingText(r);
  const dest = (SIGNAL_ACTION_LINKS[r.id] && SIGNAL_ACTION_LINKS[r.id].label) || 'Dashboard';
  return (
    '<a href="' +
    href +
    '" target="_top" class="pr-rem-link" title="Open ' +
    dest +
    '">' +
    label +
    '</a>'
  );
};

window.renderActionCardsHtml = function () {
  return getActionRecommendations()
    .map(
      (a) => `
  <div class="action-card">
    <div class="action-card-body">
      <div class="action-card-icon">${a.icon}</div>
      <div class="action-card-content">
        <div class="action-card-title">${a.title}</div>
        <div class="action-card-desc">${a.description}</div>
        <div class="action-progress-wrap">
          <div class="action-progress-meta">
            <span class="prog-val">${a.progressLabel}</span>
            <span>${a.pct}%</span>
          </div>
          <div class="action-progress-bar">
            <div class="action-progress-fill" style="width:0%" data-w="${a.pct}%"></div>
          </div>
        </div>
        <div class="impact-badge ${a.impactLevel.cls}">${a.impactLevel.emoji} ${a.impactLevel.label}</div>
        <div class="impact-pct">Placement Impact: <span>+${a.impact}% Eligibility</span></div>
      </div>
    </div>
    <a class="action-cta" href="${a.href}" target="_top">${a.cta}</a>
  </div>`
    )
    .join('');
};

window.renderDashboardTierCards = function () {
  const currentTier = getCurrentEligibleTier();
  return PLACEMENT_ENGINE.tiers
    .map((tier) => {
      const e = getTierEligibility(tier);
      const isCurrent = tier.key === currentTier.key;
      const fillColor = e.eligible ? 'var(--accent-green, #9df535)' : 'var(--accent-amber, #b45309)';
      const barWidth = e.pct + '%';
      const topSignals = e.results
        .slice(0, 3)
        .map((r) => {
          const st = statusLabel(r.status);
          const need = r.status === 'done' ? '' : `<span class="signal-need">${r.remaining}</span>`;
          const val = `${r.current}/${r.required}`;
          return `<div class="signal-row">
      <span class="signal-name">${r.name}</span>
      <span class="signal-val ${st.cls}">${val}</span>${need}
    </div>`;
        })
        .join('');
      return `<div class="tier-card tier-card-${tier.key.toLowerCase()} ${e.eligible ? 'eligible' : ''} ${isCurrent ? 'current' : ''}">
    <div class="tc-head">
      <div class="tc-name">${tier.icon} ${tier.name}</div>
      <div class="tc-range">${tier.range}</div>
    </div>
    <div class="tc-pct">${e.pct}% Eligible</div>
    <div class="tc-bar"><div class="tc-fill" style="width:${barWidth};background:${fillColor}" data-w="${barWidth}"></div></div>
    <div class="tc-foot ${e.eligible ? 'eligible' : 'pending'}">${e.eligible ? '✔ Eligible' : `Need ${e.missing} More Signal${e.missing !== 1 ? 's' : ''}`}</div>
    <div class="signal-list">${topSignals}</div>
  </div>`;
    })
    .join('');
};

window.renderDashboardPlacementWidget = function () {
  const placementScore = getPlacementScore();
  const currentTier = getCurrentEligibleTier();
  const tierAElig = getTierEligibility(PLACEMENT_ENGINE.tiers[0]);
  const nextTier = PLACEMENT_ENGINE.tiers[0];
  return `<div class="pw-main">
    <div class="pw-eyebrow">🚀 Your Rank</div>
    <div class="pw-tier">${currentTier.icon} ${currentTier.name} (${currentTier.range})</div>
    <div class="pw-score">Eligibility Score: ${placementScore}% · Need ${tierAElig.missing} more signal${tierAElig.missing !== 1 ? 's' : ''} to unlock ${nextTier.name}</div>
  </div>
  <a class="pw-cta" href="/placement-readiness" target="_top">View Full Breakdown →</a>`;
};
