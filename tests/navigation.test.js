/**
 * tests/navigation.test.js
 * ------------------------------------------------------------------
 * Unit tests for the vanilla navigation module, using a minimal
 * fake `window` (no DOM library required). Run with: npm test
 * ------------------------------------------------------------------
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

// Minimal fake window must exist before importing modules that use it.
globalThis.window = {
  location: { hash: '' },
  _listeners: {},
  addEventListener(event, fn) {
    (this._listeners[event] ||= []).push(fn);
  },
  emit(event) {
    for (const fn of this._listeners[event] || []) fn();
  },
};

const {
  VIEWS,
  VIEW_TITLES,
  DEFAULT_VIEW,
  PARAM_VIEWS,
  parseHash,
  buildHash,
  navigate,
  startNavigation,
  navigationStore,
} = await import('../js/state/navigation.js');

test('VIEWS lists all nine primary pages from ARCHITECTURE.md', () => {
  assert.deepEqual([...VIEWS].sort(), [
    'candidate-workspace',
    'create-job',
    'dashboard',
    'follow-ups',
    'job-workspace',
    'jobs',
    'master-templates',
    'quick-copy',
    'talent-pool',
  ]);
});

test('every view has a title', () => {
  for (const view of VIEWS) {
    assert.ok(VIEW_TITLES[view], `missing title for ${view}`);
  }
});

test('parseHash accepts known views and rejects unknown ones', () => {
  assert.deepEqual(parseHash('#/jobs'), { view: 'jobs', jobId: null, candidateId: null });
  assert.deepEqual(parseHash('#jobs'), { view: 'jobs', jobId: null, candidateId: null });
  assert.deepEqual(parseHash('#/master-templates'), {
    view: 'master-templates',
    jobId: null,
    candidateId: null,
  });
  assert.equal(parseHash(''), null);
  assert.equal(parseHash('#/does-not-exist'), null);
  assert.equal(parseHash(undefined), null);
});

test('parseHash carries resource ids for parameterised views (PRD §9/§19–24)', () => {
  assert.deepEqual(parseHash('#/job-workspace/42'), {
    view: 'job-workspace',
    jobId: '42',
    candidateId: null,
  });
  // Candidate opened from a job: both ids present.
  assert.deepEqual(parseHash('#/candidate-workspace/7/99'), {
    view: 'candidate-workspace',
    jobId: '7',
    candidateId: '99',
  });
  // Candidate opened from Talent Pool: no job context (PRD §24).
  assert.deepEqual(parseHash('#/candidate-workspace/99'), {
    view: 'candidate-workspace',
    jobId: null,
    candidateId: '99',
  });
  // Malformed / excess segments are rejected, not guessed.
  assert.equal(parseHash('#/job-workspace/'), null);
  assert.equal(parseHash('#/job-workspace/1/2'), null);
  assert.equal(parseHash('#/candidate-workspace/1/2/3'), null);
  assert.equal(parseHash('#/jobs/extra'), null);
});

test('buildHash round-trips through parseHash', () => {
  for (const view of PARAM_VIEWS) {
    assert.ok(VIEWS.includes(view));
  }
  const cases = [
    ['job-workspace', { jobId: 42 }, '#/job-workspace/42'],
    ['candidate-workspace', { jobId: 7, candidateId: 99 }, '#/candidate-workspace/7/99'],
    ['candidate-workspace', { candidateId: 99 }, '#/candidate-workspace/99'],
    ['jobs', {}, '#/jobs'],
  ];
  for (const [view, params, expected] of cases) {
    const hash = buildHash(view, params);
    assert.equal(hash, expected);
    const parsed = parseHash(hash);
    assert.ok(parsed, `round-trip failed for ${hash}`);
    assert.equal(parsed.view, view);
    assert.equal(parsed.jobId, params.jobId != null ? String(params.jobId) : null);
    assert.equal(parsed.candidateId, params.candidateId != null ? String(params.candidateId) : null);
  }
});

test('navigate updates hash and store; unknown views are ignored', () => {
  startNavigation();
  assert.equal(navigationStore.getState().view, DEFAULT_VIEW);

  navigate('jobs');
  assert.equal(window.location.hash, '#/jobs');
  assert.equal(navigationStore.getState().view, 'jobs');

  // Unknown view must not change anything.
  navigate('not-a-view');
  assert.equal(navigationStore.getState().view, 'jobs');
});

test('back/forward via hashchange updates the store', () => {
  window.location.hash = '#/quick-copy';
  window.emit('hashchange');
  assert.equal(navigationStore.getState().view, 'quick-copy');

  // Empty/unknown hash falls back to default view.
  window.location.hash = '';
  window.emit('hashchange');
  assert.equal(navigationStore.getState().view, DEFAULT_VIEW);
});

test('navigate with resource ids updates hash and store together', () => {
  navigate('job-workspace', { jobId: 42 });
  assert.equal(window.location.hash, '#/job-workspace/42');
  assert.deepEqual(navigationStore.getState(), {
    view: 'job-workspace',
    jobId: '42',
    candidateId: null,
  });

  // Candidate with job context (opened from a Job Workspace).
  navigate('candidate-workspace', { jobId: 42, candidateId: 7 });
  assert.equal(window.location.hash, '#/candidate-workspace/42/7');
  assert.equal(navigationStore.getState().jobId, '42');
  assert.equal(navigationStore.getState().candidateId, '7');

  // Same candidate opened from Talent Pool: job context is cleared.
  navigate('candidate-workspace', { candidateId: 7 });
  assert.equal(window.location.hash, '#/candidate-workspace/7');
  assert.equal(navigationStore.getState().jobId, null);
  assert.equal(navigationStore.getState().candidateId, '7');

  // Browser back/forward to a parameterised URL works too.
  window.location.hash = '#/job-workspace/13';
  window.emit('hashchange');
  assert.deepEqual(navigationStore.getState(), {
    view: 'job-workspace',
    jobId: '13',
    candidateId: null,
  });

  // Parameterised views without an id remain valid (generic page view).
  navigate('job-workspace');
  assert.equal(window.location.hash, '#/job-workspace');
  assert.equal(navigationStore.getState().jobId, null);
});
