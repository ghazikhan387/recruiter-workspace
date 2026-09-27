/**
 * js/pages/placeholder.js
 * ------------------------------------------------------------------
 * Shared helpers for building placeholder views.
 *
 * Each page module exports a render(container) function that fills
 * its container with placeholder markup. Real implementations will
 * replace these renderers later, one feature at a time (see
 * DEVELOPMENT_RULES.md — Rule 3: small changes).
 *
 * The generic el() helper lives in js/dom.js (single canonical copy);
 * this module keeps only the throwaway placeholder-specific helpers.
 * ------------------------------------------------------------------
 */

import { el } from '../dom.js';

export function card(title, bodyNodes) {
  return el('div', { class: 'card' }, [
    title ? el('h2', { class: 'card-title' }, title) : null,
    ...[].concat(bodyNodes),
  ]);
}

export function placeholderText(message) {
  return el('p', { class: 'placeholder-note' }, message);
}

/**
 * A simple placeholder list rendered from string items.
 * Used only to sketch the shape of future pages.
 */
export function placeholderList(items) {
  return el(
    'ul',
    { class: 'list' },
    items.map((text) => el('li', { class: 'list-item' }, text))
  );
}
