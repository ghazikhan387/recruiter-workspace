/**
 * tests/shell-consistency.test.js
 * ------------------------------------------------------------------
 * Guards the naming convention shared by four namespaces:
 *   view id (navigation VIEWS) ↔ URL hash (#/<view>) ↔
 *   DOM container id (js/pages/index.js registry) ↔ index.html.
 * If any of them drifts, navigation would silently render an empty
 * page — this test fails loudly instead (DEVELOPMENT_RULES Rule 12).
 * ------------------------------------------------------------------
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

globalThis.window = { location: { hash: '' }, addEventListener() {} };

const { VIEWS } = await import('../js/state/navigation.js');
const { pages } = await import('../js/pages/index.js');

const html = readFileSync(
  fileURLToPath(new URL('../index.html', import.meta.url)),
  'utf8'
);

test('every view is registered in the page registry with a matching container id', () => {
  for (const view of VIEWS) {
    const page = pages[view];
    assert.ok(page, `view "${view}" has no entry in js/pages/index.js`);
    assert.equal(
      page.containerId,
      `view-${view}`,
      `registry/container-id convention broken for "${view}"`
    );
  }
});

test('registry contains exactly the known views (no orphans)', () => {
  assert.deepEqual(Object.keys(pages).sort(), [...VIEWS].sort());
});

test('every registered container id exists as an element id in index.html', () => {
  for (const [view, page] of Object.entries(pages)) {
    assert.ok(
      html.includes(`id="${page.containerId}"`),
      `index.html is missing <div id="${page.containerId}"> for view "${view}"`
    );
  }
});

test('every view is addressable via #/<view> and present in the sidebar markup contract', () => {
  // The hash form is derived from the view id (buildHash); verify the
  // shell's Alpine x-show bindings reference each view id string.
  for (const view of VIEWS) {
    assert.ok(
      html.includes(`currentView === '${view}'`),
      `index.html has no x-show binding for view "${view}"`
    );
  }
});
