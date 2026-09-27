/**
 * js/pages/dashboard.js — Dashboard (placeholder only)
 */
import { el } from '../dom.js';
import { card, placeholderText, placeholderList } from './placeholder.js';

export function render(container) {
  container.replaceChildren(
    card('Today\u2019s Jobs', [
      placeholderText('Placeholder \u2014 will list the jobs currently being worked on.'),
      placeholderList(['Job A \u2014 n candidates', 'Job B \u2014 n candidates', 'Job C \u2014 n candidates']),
    ]),
    card('Follow-ups Today', [
      placeholderText('Placeholder \u2014 will list candidates requiring attention today.'),
    ]),
    card('Quick Actions', [
      placeholderText('Placeholder \u2014 Open Job / Create Job / Add Candidate / Quick Copy / Talent Pool.'),
    ])
  );
}
