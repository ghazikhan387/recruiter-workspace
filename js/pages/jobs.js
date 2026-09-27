/**
 * js/pages/jobs.js — Jobs / Active Jobs (placeholder only)
 */
import { el } from '../dom.js';
import { card, placeholderText, placeholderList } from './placeholder.js';

export function render(container) {
  container.replaceChildren(
    card('Active Jobs', [
      placeholderText('Placeholder \u2014 will list active jobs and open a Job Workspace when selected.'),
      placeholderList(['Active job 1', 'Active job 2']),
    ])
  );
}
