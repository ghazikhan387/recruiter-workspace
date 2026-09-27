/**
 * js/pages/quick-copy.js — Quick Copy (placeholder only)
 */
import { el, card, placeholderText } from './placeholder.js';

export function render(container) {
  container.replaceChildren(
    card('Quick Copy Library', [
      placeholderText('Placeholder \u2014 reusable text snippets independent of jobs and candidates, with search, pin, edit, delete, and copy.'),
    ])
  );
}
