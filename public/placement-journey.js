/* Placement Journey — visual stepper + assessment metrics */
window.PLACEMENT_JOURNEY = {
  currentStep: 1,
  steps: [
    {
      id: 1,
      name: 'Online Assessment',
      state: 'current',
      badge: 'Attempted But Not Cleared',
      badgeType: 'warning',
    },
    { id: 2, name: 'FE Project', state: 'locked' },
    { id: 3, name: 'AI Mock Interview', state: 'locked' },
    { id: 4, name: 'Human Interview', state: 'locked' },
    { id: 5, name: 'Placement Access', state: 'locked' },
  ],
  summary: {
    currentStage: 'Online Assessment',
    status: 'Attempted But Not Cleared',
    stagesCompleted: 1,
    totalStages: 5,
    progressPct: 20,
  },
  assessmentResults: {
    statusBadge: { label: '🟠 NOT CLEARED', type: 'not-cleared' },
    metrics: [
      { key: 'overall', label: 'Overall Score', score: 80, max: 150, pct: 53, color: '#2D8C6A' },
      { key: 'mcq', label: 'MCQ Score', score: 20, max: 30, pct: 67, color: '#7C3AED' },
      { key: 'coding', label: 'Coding Score', score: 60, max: 120, pct: 50, color: '#F59E0B' },
    ],
  },
};

window.renderProgressRing = function (pct, size, color, stroke) {
  const s = size || 88;
  const sw = stroke || 8;
  const r = (s - sw) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return `<svg class="pj-ring" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <circle cx="${s/2}" cy="${s/2}" r="${r}" fill="none" stroke="#E8F0EC" stroke-width="${sw}"/>
    <circle cx="${s/2}" cy="${s/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}"
      stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${offset}"
      transform="rotate(-90 ${s/2} ${s/2})" class="pj-ring-fill"/>
    <text x="${s/2}" y="${s/2}" text-anchor="middle" dominant-baseline="central"
      class="pj-ring-pct" font-size="${s > 80 ? 16 : 14}" font-weight="800" fill="#0D3D2E">${pct}%</text>
  </svg>`;
};

window.renderJourneyStepper = function () {
  const steps = PLACEMENT_JOURNEY.steps;
  return `<div class="pj-stepper">
    ${steps
      .map((step, i) => {
        const isLast = i === steps.length - 1;
        let nodeInner = '';
        if (step.state === 'completed') {
          nodeInner = `<div class="pj-node-circle completed"><span>✔</span></div>`;
        } else if (step.state === 'current') {
          nodeInner = `<div class="pj-node-circle current"><span>🟢</span></div>`;
        } else {
          nodeInner = `<div class="pj-node-circle locked"><span>🔒</span></div>`;
        }
        const badge =
          step.badge && step.state === 'current'
            ? `<div class="pj-node-badge pj-badge-${step.badgeType || 'warning'}">${step.badge}</div>`
            : step.state === 'locked'
              ? `<div class="pj-node-badge pj-badge-locked">🔒 Locked</div>`
              : step.state === 'completed'
                ? `<div class="pj-node-badge pj-badge-done">✔ Completed</div>`
                : '';
        const connector = !isLast
          ? `<div class="pj-connector ${step.state === 'completed' ? 'done' : ''}"></div>`
          : '';
        return `<div class="pj-step-node ${step.state}">
          ${nodeInner}
          <div class="pj-node-title">${step.name}</div>
          ${badge}
        </div>${connector}`;
      })
      .join('')}
  </div>`;
};

window.renderJourneySummary = function () {
  const s = PLACEMENT_JOURNEY.summary;
  return `<div class="pj-summary">
    <div class="pj-summary-title">Placement Status</div>
    <div class="pj-summary-grid">
      <div class="pj-summary-item">
        <span class="pj-sum-lbl">Current Stage</span>
        <span class="pj-sum-val">${s.currentStage}</span>
      </div>
      <div class="pj-summary-item">
        <span class="pj-sum-lbl">Status</span>
        <span class="pj-sum-val pj-sum-warn">${s.status}</span>
      </div>
      <div class="pj-summary-item">
        <span class="pj-sum-lbl">Overall Progress</span>
        <span class="pj-sum-val">${s.stagesCompleted} / ${s.totalStages} Stages Completed</span>
      </div>
    </div>
    <div class="pj-summary-bar-wrap">
      <div class="pj-summary-bar"><div class="pj-summary-fill" style="width:0%" data-w="${s.progressPct}%"></div></div>
      <span class="pj-summary-pct">${s.progressPct}%</span>
    </div>
  </div>`;
};

window.renderAssessmentResults = function () {
  const ar = PLACEMENT_JOURNEY.assessmentResults;
  const badgeCls = ar.statusBadge.type;
  const cards = ar.metrics
    .map(
      (m) => `<div class="pj-metric-card">
      <div class="pj-metric-label">${m.label}</div>
      <div class="pj-metric-ring">${renderProgressRing(m.pct, 96, m.color)}</div>
      <div class="pj-metric-score">${m.score} <span>/ ${m.max}</span></div>
    </div>`
    )
    .join('');
  return `<div class="pj-assess-section">
    <div class="pj-assess-header">
      <div class="pj-assess-title">Assessment Results</div>
      <span class="pj-assess-badge pj-ab-${badgeCls}">${ar.statusBadge.label}</span>
    </div>
    <div class="pj-metrics-grid">${cards}</div>
  </div>`;
};

window.renderDashboardJourney = function () {
  return `<section class="pj-widget-wrap">
    <div class="pj-widget-header">🎯 Placement Journey</div>
    ${renderJourneyStepper()}
    ${renderJourneySummary()}
    ${renderAssessmentResults()}
  </section>`;
};

window.renderFullJourneyPage = function () {
  return `
    ${renderJourneyStepper()}
    ${renderJourneySummary()}
    ${renderAssessmentResults()}
  `;
};
