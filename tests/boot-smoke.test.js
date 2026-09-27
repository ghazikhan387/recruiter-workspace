/**
 * tests/boot-smoke.test.js
 * ------------------------------------------------------------------
 * End-to-end smoke test of the boot sequence using a minimal fake
 * window/document (no DOM library). Verifies that:
 *   - app.js boots and renders the default page into its container,
 *   - hash navigation switches views and renders the new page,
 *   - unknown hashes fall back to the dashboard.
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
    const node = {
      tag,
      attrs: {},
      children: [],
      className: '',
      setAttribute(k, v) {
        this.attrs[k] = v;
      },
      appendChild(n) {
        this.children.push(n);
      },
      addEventListener() {},
    };
    return node;
  },
  createTextNode(text) {
    return { text };
  },
  addEventListener() {},
};

const { navigationStore } = await import('../js/state/navigation.js');
await import('../js/app.js'); // boots: registers + startNavigation()

function emitHashChange() {
  for (const fn of listeners['hashchange'] || []) fn();
}

test('boot renders the default (dashboard) view', () => {
  assert.equal(navigationStore.getState().view, 'dashboard');
  const c = containers.get('view-dashboard');
  assert.ok(c, 'dashboard container should have been created');
  assert.ok(c.rendered && c.rendered.length > 0, 'dashboard should render placeholder cards');
});

test('hash navigation renders the target page', () => {
  window.location.hash = '#/create-job';
  emitHashChange();
  assert.equal(navigationStore.getState().view, 'create-job');
  const c = containers.get('view-create-job');
  assert.ok(c.rendered && c.rendered.length === 1, 'create-job renders one card');
});

test('unknown hash falls back to dashboard', () => {
  window.location.hash = '#/nonsense';
  emitHashChange();
  assert.equal(navigationStore.getState().view, 'dashboard');
});
