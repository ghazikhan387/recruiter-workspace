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

  // The FIRST explicit set of a key always notifies — even when the
  // value equals the initial default. This is the boot case that used
  // to silently drop the first render (applyHash setting view:
  // 'dashboard' on a fresh page load).
  store.setState({ view: 'dashboard' });
  assert.equal(calls, 1);

  // Subsequent identical sets are no-ops.
  store.setState({ view: 'dashboard' });
  assert.equal(calls, 1);

  store.setState({ view: 'jobs' });
  assert.equal(calls, 2);

  unsubscribe();
  store.setState({ view: 'quick-copy' });
  assert.equal(calls, 2);
});

test('first setState reports keys equal to the initial default as changed', () => {
  const store = createStore({ step: 'intro' });
  const seen = [];
  store.subscribe((state, changed) => seen.push([...changed]));

  // Boot case: the very first set of a key notifies even when the
  // value equals the initial default (this is what made the first
  // render happen on a fresh page load).
  const changed = store.setState({ step: 'intro' });
  assert.deepEqual(changed, ['step']);
  assert.deepEqual(seen, [['step']]);

  // Afterwards it behaves like a normal equality-checked store.
  assert.deepEqual(store.setState({ step: 'intro' }), []);
  assert.deepEqual(store.setState({ step: 'details' }), ['step']);
  assert.equal(seen.length, 2);
});

test('re-setting a previously-seen value notifies again (state-machine Back/Restart)', () => {
  // Relevant for the future Call Assistant (PRD §14/§15): "Back" or
  // "jump to step" may set the step id to a value that was stored
  // before and currently equals the stored value only after an
  // intervening change. Example: intro → details → intro → (Back to
  // 'intro' while already on 'intro' is a genuine no-op, but
  // intro → details → intro must notify both times).
  const store = createStore({ step: null });
  const steps = [];
  store.subscribe((state) => steps.push(state.step));

  store.setState({ step: 'intro' });
  store.setState({ step: 'details' });
  store.setState({ step: 'intro' }); // Back — different from current, notifies
  assert.deepEqual(steps, ['intro', 'details', 'intro']);

  // Only a set that leaves the value untouched AND has been explicitly
  // set before is suppressed:
  store.setState({ step: 'intro' });
  assert.equal(steps.length, 3);
});
