/**
 * js/state/navigation.js
 * ------------------------------------------------------------------
 * Navigation state for the single-page application shell.
 *
 * Views are addressed via the URL hash (#/jobs, #/job-workspace, ...)
 * so browser back/forward works without any routing library.
 * ------------------------------------------------------------------
 */

import { createStore } from './store.js';

/** Canonical list of views in the application. */
export const VIEWS = [
  'dashboard',
  'jobs',
  'create-job',
  'job-workspace',
  'candidate-workspace',
  'talent-pool',
  'follow-ups',
  'quick-copy',
  'master-templates',
];

export const DEFAULT_VIEW = 'dashboard';

export const navigationStore = createStore({
  view: DEFAULT_VIEW,
});

/** Human-readable titles used by the top bar. */
export const VIEW_TITLES = {
  dashboard: 'Dashboard',
  jobs: 'Jobs',
  'create-job': 'Create Job',
  'job-workspace': 'Job Workspace',
  'candidate-workspace': 'Candidate Workspace',
  'talent-pool': 'Talent Pool',
  'follow-ups': 'Follow-ups',
  'quick-copy': 'Quick Copy',
  'master-templates': 'Master Templates',
};

/** Parse a location hash like "#/jobs" into a known view id. */
export function parseHash(hash) {
  const raw = String(hash || '').replace(/^#\/?/, '').trim();
  return VIEWS.includes(raw) ? raw : null;
}

/** Read the current hash and sync the store accordingly. */
function applyHash() {
  const view = parseHash(window.location.hash) || DEFAULT_VIEW;
  navigationStore.setState({ view });
}

/**
 * Navigate programmatically by updating the URL hash. The registered
 * hashchange listener applies the change to the store. If the hash is
 * already correct (no event will fire), sync directly instead.
 */
export function navigate(view) {
  if (!VIEWS.includes(view)) {
    console.warn(`[navigation] unknown view: ${view}`);
    return;
  }
  if (window.location.hash === `#/${view}`) {
    applyHash();
  } else {
    window.location.hash = `#/${view}`;
    // Browsers fire a hashchange event when the hash changes. Real
    // navigation relies on that event; apply the state here as well so
    // programmatic navigation works even in minimal test environments
    // (applyHash is idempotent).
    applyHash();
  }
}

/**
 * Start listening to hash changes. Call once at boot.
 * Unknown or empty hashes fall back to the default view.
 */
export function startNavigation() {
  window.addEventListener('hashchange', applyHash);
  applyHash();
}
