/**
 * tests/page-lifecycle.test.js
 * ------------------------------------------------------------------
 * Verifies the page-module lifecycle contract implemented in app.js:
 *   - render(container) on activation / re-render,
 *   - destroy() called ONLY when navigating to a DIFFERENT view
 *     (the future home for cancelling debounce timers such as the
 *     PRD §35 autosave),
 *   - resource ids (jobId/candidateId) changing within the same view
 *     must NOT trigger destroy or a re-render at this phase.
 * Uses a minimal fake window/document (same style as boot-smoke).
 * ------------------------------------------------------------------
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

const listeners = {};
const containers = new Map();

function makeContainer(id) {
  return {
    id,
    rendered: null,
    replaceChildren(...nodes) {
      this.rendered = nodes;
    },
  };
}

globalThis.window = {
  location: { hash: '' },
  addEventListener(event, fn) {
    (listeners[event] ||= []).push(fn);
  },
};

globalThis.document = {
  readyState: 'complete',
  getElementById(id) {
    if (!containers.has(id)) containers.set(id, makeContainer(id));
    return containers.get(id);
  },
  createElement(tag) {
    return {
      tag,
      attrs: {},
      className: '',
      setAttribute(k, v) {
        this.attrs[k] = v;
      },
      appendChild() {},
      addEventListener() {},
    };
  },
  createTextNode(text) {
    return { text };
  },
  addEventListener() {},
};

const { navigationStore, navigate } = await import('../js/state/navigation.js');
await import('../js/app.js'); // boots: binds the lifecycle-aware renderer

function emitHashChange() {
  for (const fn of listeners['hashchange'] || []) fn();
}

// Instrument a real page module through the registry.
const { pages } = await import('../js/pages/index.js');
let destroyCalls = 0;
let renderCalls = 0;
pages.jobs.module = {
  render() {
    renderCalls += 1;
  },
  destroy() {
    destroyCalls += 1;
  },
};

test('boot renders the initial view without calling destroy', () => {
  assert.equal(renderCalls, 0); // jobs was not the boot view
  assert.equal(destroyCalls, 0);
});

test('entering a view renders it; leaving it calls destroy exactly once', () => {
  navigate('jobs');
  assert.equal(renderCalls, 1);
  assert.equal(destroyCalls, 0);

  navigate('dashboard');
  assert.equal(destroyCalls, 1, 'destroy must run when navigating away');

  navigate('jobs');
  assert.equal(renderCalls, 2);
  navigate('follow-ups');
  assert.equal(destroyCalls, 2);
});

test('re-navigating to the same view does not call destroy', () => {
  navigate('jobs'); // from follow-ups → jobs: fresh entry
  const destroysBefore = destroyCalls;
  navigate('jobs'); // already there: re-render only, never destroy
  assert.equal(destroyCalls, destroysBefore);
});

test('changing jobId within the same view does not re-render or destroy (this phase)', () => {
  navigate('job-workspace', { jobId: 1 });
  const renders = containers.get('view-job-workspace').rendered;
  window.location.hash = '#/job-workspace/2';
  emitHashChange();
  assert.equal(navigationStore.getState().jobId, '2');
  assert.equal(
    containers.get('view-job-workspace').rendered,
    renders,
    'placeholder pages ignore ids; id-only changes must not churn the DOM'
  );
});
