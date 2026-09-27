/**
 * js/pages/index.js
 * ------------------------------------------------------------------
 * Page registry: maps view ids (see js/state/navigation.js) to their
 * placeholder renderers. Each page module exposes render(container).
 * ------------------------------------------------------------------
 */

import * as dashboard from './dashboard.js';
import * as jobs from './jobs.js';
import * as createJob from './create-job.js';
import * as jobWorkspace from './job-workspace.js';
import * as candidateWorkspace from './candidate-workspace.js';
import * as talentPool from './talent-pool.js';
import * as followUps from './follow-ups.js';
import * as quickCopy from './quick-copy.js';
import * as masterTemplates from './master-templates.js';

export const pages = {
  dashboard: { containerId: 'view-dashboard', module: dashboard },
  jobs: { containerId: 'view-jobs', module: jobs },
  'create-job': { containerId: 'view-create-job', module: createJob },
  'job-workspace': { containerId: 'view-job-workspace', module: jobWorkspace },
  'candidate-workspace': { containerId: 'view-candidate-workspace', module: candidateWorkspace },
  'talent-pool': { containerId: 'view-talent-pool', module: talentPool },
  'follow-ups': { containerId: 'view-follow-ups', module: followUps },
  'quick-copy': { containerId: 'view-quick-copy', module: quickCopy },
  'master-templates': { containerId: 'view-master-templates', module: masterTemplates },
};

/** Render a view into its container (idempotent; safe to call repeatedly). */
export function renderPage(view) {
  const page = pages[view];
  if (!page) {
    console.warn(`[pages] no registered page module for view "${view}"`);
    return false;
  }
  const container = document.getElementById(page.containerId);
  if (!container) {
    // Registry/DOM drift would otherwise fail silently (blank page, no
    // error). tests/shell-consistency.test.js guards against this in CI.
    console.warn(
      `[pages] container #${page.containerId} for view "${view}" is missing from the DOM`
    );
    return false;
  }
  page.module.render(container);
  return true;
}
