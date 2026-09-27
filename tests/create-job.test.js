/**
 * tests/create-job.test.js
 * ------------------------------------------------------------------
 * Guards the product rule: nine structured job aspects exist, but
 * their final labels/meanings are NOT invented (PRD §9, Rule 2).
 * Uses a fake `window` because page modules import browser globals.
 * ------------------------------------------------------------------
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

globalThis.window = { location: { hash: '' }, addEventListener() {} };

const { JOB_ASPECT_COUNT, jobAspectPlaceholders } = await import(
  '../js/pages/create-job.js'
);

test('Create Job supports exactly nine structured job aspects', () => {
  assert.equal(JOB_ASPECT_COUNT, 9);
  const aspects = jobAspectPlaceholders();
  assert.equal(aspects.length, 9);
});

test('aspects are independent fields with unique keys', () => {
  const aspects = jobAspectPlaceholders();
  const keys = new Set(aspects.map((a) => a.key));
  assert.equal(keys.size, 9);
});

test('aspect labels remain neutral placeholders (not invented meanings)', () => {
  for (const [i, aspect] of jobAspectPlaceholders().entries()) {
    assert.equal(aspect.label, `Job Aspect #${i + 1}`);
    // The label must not smuggle in an invented definition.
    assert.match(aspect.note, /pending/i);
  }
});
