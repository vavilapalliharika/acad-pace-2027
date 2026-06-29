/* PACE Dashboard — journey stages, assessments, stepper */
window.PACE_JOURNEY = {
  stages: [
    {
      id: 'profile',
      name: 'Profile Registration',
      state: 'completed',
      assessments: [
        {
          key: 'coding',
          title: 'Coding',
          pct: 35,
          color: '#8b5cf6',
          meta: [
            { label: 'Score', value: '42 / 120' },
            { label: 'Progress', value: '35%' },
            { label: 'Status', value: 'Completed' },
          ],
        },
        {
          key: 'aptitude',
          title: 'Aptitude & Reasoning',
          pct: 60,
          color: '#a78bfa',
          meta: [
            { label: 'Score', value: '18 / 30' },
            { label: 'Accuracy', value: '60%' },
            { label: 'Rank', value: '#28' },
          ],
        },
        {
          key: 'mcq',
          title: 'Technical MCQs',
          pct: 45,
          color: '#f59e0b',
          meta: [
            { label: 'Score', value: '14 / 30' },
            { label: 'Attempts', value: '1' },
            { label: 'Progress', value: '45%' },
          ],
        },
      ],
    },
    {
      id: 'poa',
      name: 'Placement Online Assessment',
      state: 'completed',
      assessments: [
        {
          key: 'coding',
          title: 'Coding',
          pct: 42,
          color: '#8b5cf6',
          meta: [
            { label: 'Score', value: '50 / 120' },
            { label: 'Progress', value: '42%' },
            { label: 'Status', value: 'Completed' },
          ],
        },
        {
          key: 'aptitude',
          title: 'Aptitude & Reasoning',
          pct: 70,
          color: '#a78bfa',
          meta: [
            { label: 'Score', value: '21 / 30' },
            { label: 'Accuracy', value: '70%' },
            { label: 'Rank', value: '#18' },
          ],
        },
        {
          key: 'mcq',
          title: 'Technical MCQs',
          pct: 53,
          color: '#f59e0b',
          meta: [
            { label: 'Score', value: '16 / 30' },
            { label: 'Attempts', value: '1' },
            { label: 'Progress', value: '53%' },
          ],
        },
      ],
    },
    {
      id: 'tr1',
      name: 'TR-1',
      state: 'completed',
      assessments: [
        {
          key: 'coding',
          title: 'Coding',
          pct: 55,
          color: '#8b5cf6',
          meta: [
            { label: 'Score', value: '66 / 120' },
            { label: 'Progress', value: '55%' },
            { label: 'Status', value: 'Cleared' },
          ],
        },
        {
          key: 'aptitude',
          title: 'Aptitude & Reasoning',
          pct: 75,
          color: '#a78bfa',
          meta: [
            { label: 'Score', value: '23 / 30' },
            { label: 'Accuracy', value: '75%' },
            { label: 'Rank', value: '#15' },
          ],
        },
        {
          key: 'mcq',
          title: 'Technical MCQs',
          pct: 58,
          color: '#f59e0b',
          meta: [
            { label: 'Score', value: '17 / 30' },
            { label: 'Attempts', value: '2' },
            { label: 'Progress', value: '58%' },
          ],
        },
      ],
    },
    {
      id: 'tr2',
      name: 'TR-2',
      state: 'completed',
      assessments: [
        {
          key: 'coding',
          title: 'Coding',
          pct: 48,
          color: '#8b5cf6',
          meta: [
            { label: 'Score', value: '58 / 120' },
            { label: 'Progress', value: '48%' },
            { label: 'Status', value: 'Cleared' },
          ],
        },
        {
          key: 'aptitude',
          title: 'Aptitude & Reasoning',
          pct: 77,
          color: '#a78bfa',
          meta: [
            { label: 'Score', value: '23 / 30' },
            { label: 'Accuracy', value: '77%' },
            { label: 'Rank', value: '#14' },
          ],
        },
        {
          key: 'mcq',
          title: 'Technical MCQs',
          pct: 57,
          color: '#f59e0b',
          meta: [
            { label: 'Score', value: '17 / 30' },
            { label: 'Attempts', value: '2' },
            { label: 'Progress', value: '57%' },
          ],
        },
      ],
    },
    {
      id: 'eligibility',
      name: 'Placement Eligibility',
      state: 'current',
      assessments: [
        {
          key: 'coding',
          title: 'Coding',
          pct: 50,
          color: '#8b5cf6',
          meta: [
            { label: 'Score', value: '60 / 120' },
            { label: 'Progress', value: '50%' },
            { label: 'Status', value: 'Attempted' },
          ],
        },
        {
          key: 'aptitude',
          title: 'Aptitude & Reasoning',
          pct: 80,
          color: '#a78bfa',
          meta: [
            { label: 'Score', value: '24 / 30' },
            { label: 'Accuracy', value: '80%' },
            { label: 'Rank', value: '#12' },
          ],
        },
        {
          key: 'mcq',
          title: 'Technical MCQs',
          pct: 60,
          color: '#f59e0b',
          meta: [
            { label: 'Score', value: '18 / 30' },
            { label: 'Attempts', value: '2' },
            { label: 'Progress', value: '60%' },
          ],
        },
      ],
    },
  ],
};

window.getPaceJourneyStages = function () {
  return PACE_JOURNEY.stages;
};

window.getCurrentJourneyStage = function () {
  var stages = getPaceJourneyStages();
  for (var i = 0; i < stages.length; i++) {
    if (stages[i].state === 'current') return stages[i];
  }
  return stages[stages.length - 1];
};

window.getJourneyStageById = function (id) {
  return getPaceJourneyStages().find(function (s) {
    return s.id === id;
  });
};

window.renderPaceJourneyStepper = function () {
  var steps = getPaceJourneyStages().slice(0, 5);

  var html = '<div class="pj-stepper">';
  steps.forEach(function (step, i) {
    var isLast = i === steps.length - 1;
    var circleClass = 'pj-node-circle';
    var icon = '';
    if (step.state === 'completed') {
      circleClass += ' completed';
      icon = '✔';
    } else if (step.state === 'current') {
      circleClass += ' current';
      icon = '●';
    } else {
      circleClass += ' locked';
      icon = '🔒';
    }

    var badge = '';
    if (step.state === 'current') {
      badge = '<div class="pj-node-badge pj-badge-warning">In Progress</div>';
    } else if (step.state === 'locked') {
      badge = '<div class="pj-node-badge pj-badge-locked">🔒 Locked</div>';
    } else if (step.state === 'completed') {
      badge = '<div class="pj-node-badge pj-badge-done">✔ Completed</div>';
    }

    html +=
      '<div class="pj-step-node ' +
      step.state +
      '">' +
      '<div class="' +
      circleClass +
      '"><span>' +
      icon +
      '</span></div>' +
      '<div class="pj-node-title">' +
      step.name +
      '</div>' +
      badge +
      '</div>';

    if (!isLast) {
      html +=
        '<div class="pj-connector' +
        (step.state === 'completed' ? ' done' : '') +
        '"></div>';
    }
  });
  html += '</div>';
  return html;
};

window.renderAssessmentStageDropdown = function (selectedId) {
  selectedId = selectedId || getCurrentJourneyStage().id;
  var stages = getPaceJourneyStages();
  var current = getCurrentJourneyStage();

  var options = stages
    .map(function (s) {
      if (s.state === 'locked') {
        return (
          '<option value="' +
          s.id +
          '" disabled>🔒 ' +
          s.name +
          ' — Not attempted</option>'
        );
      }
      var sel = s.id === selectedId ? ' selected' : '';
      var label = s.name;
      if (s.id === current.id) label += ' (Current)';
      else if (s.state === 'completed') label = '✓ ' + label;
      return '<option value="' + s.id + '"' + sel + '>' + label + '</option>';
    })
    .join('');

  return (
    '<div class="pace-assess-select-wrap">' +
    '<label class="pace-assess-select-label" for="assess-stage-select">Journey stage</label>' +
    '<select id="assess-stage-select" class="pace-assess-select" aria-label="Select placement journey stage">' +
    options +
    '</select></div>'
  );
};

window.renderPaceAssessments = function (stageId) {
  stageId = stageId || getCurrentJourneyStage().id;
  var stage = getJourneyStageById(stageId);

  if (!stage || stage.state === 'locked' || !stage.assessments) {
    return (
      '<div class="pace-assess-locked">' +
      '<span class="pace-assess-locked-icon">🔒</span>' +
      '<p class="pace-assess-locked-title">Stage not attempted yet</p>' +
      '<p class="pace-assess-locked-sub">Complete previous placement journey stages to unlock assessment scores for <strong>' +
      (stage ? stage.name : 'this stage') +
      '</strong>.</p></div>'
    );
  }

  return stage.assessments
    .map(function (a) {
      var meta = a.meta
        .map(function (m) {
          return '<span><b>' + m.label + ':</b> ' + m.value + '</span>';
        })
        .join('');
      return (
        '<div class="pace-analytic">' +
        '<div class="pace-analytic-title">' +
        a.title +
        '</div>' +
        renderPaceRing(a.pct, 100, a.color) +
        '<div class="pace-analytic-meta">' +
        meta +
        '</div></div>'
      );
    })
    .join('');
};

window.initAssessmentStageSelector = function () {
  var select = document.getElementById('assess-stage-select');
  if (!select) return;

  select.addEventListener('change', function () {
    var stage = getJourneyStageById(select.value);
    if (!stage || stage.state === 'locked') {
      select.value = getCurrentJourneyStage().id;
      return;
    }
    var root = document.getElementById('pace-assess-root');
    if (root) {
      root.innerHTML = renderPaceAssessments(select.value);
      animatePaceRings();
    }
  });
};

/* Legacy alias */
window.renderPaceTimeline = function () {
  return renderPaceJourneyStepper();
};
