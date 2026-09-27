/**
 * js/pages/follow-ups.js — Follow-ups (placeholder only)
 */
import { el, card, placeholderText } from './placeholder.js';

export function render(container) {
  container.replaceChildren(
    card('Today', [
      placeholderText('Placeholder \u2014 candidates whose follow-up date is today.'),
    ]),
    card('Upcoming', [
      placeholderText('Placeholder \u2014 upcoming follow-up dates.'),
    ])
  );
}
