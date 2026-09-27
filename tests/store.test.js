/**
 * tests/store.test.js — unit tests for the tiny vanilla state store.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

const { createStore } = await import('../js/state/store.js');

test('setState patches state and reports changed keys', () => {
  const store = createStore({ a: 1, b: 2 });
  const changed = store.setState({ b: 3, c: 4 });
  assert.deepEqual(changed.sort(), ['b', 'c']);
  assert.deepEqual(store.getState(), { a: 1, b: 3, c: 4 });
});

test('listeners are notified only on real changes', () => {
  const store = createStore({ view: 'dashboard' });
  let calls = 0;
  const unsubscribe = store.subscribe(() => {
    calls += 1;
  });

  store.setState({ view: 'dashboard' }); // no-op: same value
  assert.equal(calls, 0);

  store.setState({ view: 'jobs' });
  assert.equal(calls, 1);

  unsubscribe();
  store.setState({ view: 'quick-copy' });
  assert.equal(calls, 1);
});
