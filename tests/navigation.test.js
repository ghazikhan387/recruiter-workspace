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
  parseHash,
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
  assert.equal(parseHash('#/jobs'), 'jobs');
  assert.equal(parseHash('#jobs'), 'jobs');
  assert.equal(parseHash('#/master-templates'), 'master-templates');
  assert.equal(parseHash(''), null);
  assert.equal(parseHash('#/does-not-exist'), null);
  assert.equal(parseHash(undefined), null);
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
