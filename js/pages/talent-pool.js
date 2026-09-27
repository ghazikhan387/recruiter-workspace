/**
 * js/pages/talent-pool.js — Talent Pool (placeholder only)
 */
import { el } from '../dom.js';
import { card, placeholderText } from './placeholder.js';

export function render(container) {
  container.replaceChildren(
    card('Talent Pool', [
      placeholderText('Placeholder \u2014 future candidates with tags, preferences, notes, and follow-up dates. Search and tag filters will appear here.'),
    ])
  );
}
