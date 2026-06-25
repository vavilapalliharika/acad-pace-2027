/* Placement Readiness & Eligibility Engine — shared mock data */
window.PLACEMENT_ENGINE = {
  student: {
    name: 'Ananya Rao',
    batch: 'YOG 2027',
    level: 3,
    levelName: 'Intermediate',
    tier: 'Intermediate',
    squad: 'Squad Alpha-7',
    mentor: 'Ravi Kumar',
    profileStrength: 78,
    riseScore: 2140,
    streak: 37,
    rank: 8,
    problems: { total: 147, easy: 52, medium: 78, hard: 17 },
  },

  tiers: [
    {
      key: 'A',
      icon: '🏆',
      name: 'Type A',
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
      icon: '🚀',
      name: 'Type B',
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
      icon: '📚',
      name: 'Type C',
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

window.getCurrentEligibleTier = function () {
  const tiers = PLACEMENT_ENGINE.tiers;
  let current = tiers[tiers.length - 1];
  for (let i = 0; i < tiers.length; i++) {
    const e = getTierEligibility(tiers[i]);
    if (e.eligible) current = tiers[i];
  }
  return current;
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
        `Complete internship preparation milestones to satisfy Type A experience requirements.`,
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
        `Need ${s.remaining} more repositor${s.remaining > 1 ? 'ies' : 'y'} to satisfy Type A eligibility requirements.`,
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
      const fillColor = e.eligible ? 'var(--gn)' : 'var(--am)';
      const topSignals = e.results
        .slice(0, 3)
        .map((r) => {
          const st = statusLabel(r.status);
          const need = r.status === 'done' ? '' : `<span class="signal-need">Need ${r.remaining} more</span>`;
          const val = r.boolean
            ? r.status === 'done'
              ? '✔ Done'
              : 'Not completed'
            : `${r.current} / ${r.required}`;
          return `<div class="signal-row">
      <span class="signal-name">${r.name}</span>
      <span class="signal-val ${st.cls}">${val}</span>${need}
    </div>`;
        })
        .join('');
      return `<div class="tier-card ${e.eligible ? 'eligible' : ''} ${isCurrent ? 'current' : ''}">
    <div class="tc-head">
      <div class="tc-name">${tier.icon} ${tier.name}</div>
      <div class="tc-range">${tier.range}</div>
    </div>
    <div class="tc-pct">${e.pct}% Eligible</div>
    <div class="tc-bar"><div class="tc-fill" style="width:0%;background:${fillColor}" data-w="${e.pct}%"></div></div>
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
    <div class="pw-eyebrow">🚀 Current Eligible Tier</div>
    <div class="pw-tier">${currentTier.icon} ${currentTier.name} (${currentTier.range})</div>
    <div class="pw-score">Eligibility Score: ${placementScore}% · Need ${tierAElig.missing} more signal${tierAElig.missing !== 1 ? 's' : ''} to unlock ${nextTier.name}</div>
  </div>
  <a class="pw-cta" href="/placement-readiness" target="_top">View Full Breakdown →</a>`;
};
