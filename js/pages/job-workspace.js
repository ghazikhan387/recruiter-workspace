/**
 * js/pages/job-workspace.js — Job Workspace (placeholder only)
 */
import { card, placeholderText } from './placeholder.js';

export function render(container) {
  container.replaceChildren(
    card('Job Workspace', [
      placeholderText('Placeholder \u2014 will show one job: its nine aspects, job-specific templates, fast copy actions, and its candidate list.'),
    ]),
    card('Candidates (this job)', [
      placeholderText('Placeholder \u2014 job-wise candidate list with status counts and Previous / Next navigation.'),
    ])
  );
}
