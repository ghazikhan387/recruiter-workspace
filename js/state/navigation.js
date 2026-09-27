/**
 * js/state/navigation.js
 * ------------------------------------------------------------------
 * Navigation state for the single-page application shell.
 *
 * Views are addressed via the URL hash (#/jobs, #/job-workspace, ...)
 * so browser back/forward works without any routing library.
 *
 * Resource identity (PRD §9/§26 Job Workspace, §19–24 Candidate
 * Workspace): views that address a specific record carry optional id
 * segments — #/job-workspace/:jobId and
 * #/candidate-workspace/:jobId/:candidateId or
 * #/candidate-workspace/:candidateId (a candidate opened from Talent
 * Pool has no job context, PRD §24). The store keeps these as
 * separate keys (jobId, candidateId) so pages can read exactly which
 * record to show without parsing the hash themselves.
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

/** Views that can address a specific job via an id segment. */
export const PARAM_VIEWS = ['job-workspace', 'candidate-workspace'];

export const DEFAULT_VIEW = 'dashboard';

export const navigationStore = createStore({
  view: DEFAULT_VIEW,
  jobId: null,
  candidateId: null,
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

/** Build a location hash for a view plus optional resource ids. */
export function buildHash(view, params = {}) {
  let hash = `#/${view}`;
  if (view === 'candidate-workspace') {
    // Two-segment form carries job context; one segment is candidate only.
    if (params.jobId != null && params.candidateId != null) {
      hash += `/${encodeURIComponent(params.jobId)}/${encodeURIComponent(params.candidateId)}`;
    } else if (params.candidateId != null) {
      hash += `/${encodeURIComponent(params.candidateId)}`;
    }
  } else if (view === 'job-workspace' && params.jobId != null) {
    hash += `/${encodeURIComponent(params.jobId)}`;
  }
  return hash;
}

/**
 * Parse a location hash into navigation state.
 *
 * Accepts "#/jobs" as well as parameterised views:
 *   "#/job-workspace/42"          → { view, jobId: '42', candidateId: null }
 *   "#/candidate-workspace/7/99"  → { view, jobId: '7', candidateId: '99' }
 *   "#/candidate-workspace/99"    → { view, jobId: null, candidateId: '99' }
 * Returns null for unknown views / malformed or excess segments.
 */
export function parseHash(hash) {
  const raw = String(hash || '').replace(/^#\/?/, '').trim();
  if (!raw) return null;
  const segments = raw.split('/');
  const view = segments[0];
  if (!VIEWS.includes(view)) return null;

  const params = segments.slice(1);
  // Ids default to null and are only overridden when the hash carries
  // segments — parseHash always returns the same full shape, which is
  // what applyHash()/the store rely on for clean change detection.
  const state = { view, jobId: null, candidateId: null };

  if (view === 'job-workspace') {
    if (params.length > 1 || (params.length === 1 && !params[0])) return null;
    if (params.length === 1) state.jobId = decodeURIComponent(params[0]);
  } else if (view === 'candidate-workspace') {
    if (params.length > 2 || params.some((s) => !s)) return null;
    if (params.length === 2) {
      state.jobId = decodeURIComponent(params[0]);
      state.candidateId = decodeURIComponent(params[1]);
    } else if (params.length === 1) {
      state.candidateId = decodeURIComponent(params[0]);
    }
  } else if (params.length > 0) {
    return null; // other views take no id segments
  }
  return state;
}

/** Read the current hash and sync the store accordingly. */
function applyHash() {
  // parseHash returns the full shape (ids default to null), so unknown/
  // parameterless hashes automatically clear stale resource ids.
  navigationStore.setState(parseHash(window.location.hash) || {
    view: DEFAULT_VIEW,
    jobId: null,
    candidateId: null,
  });
}

/**
 * Navigate programmatically by updating the URL hash. The registered
 * hashchange listener applies the change to the store. If the hash is
 * already correct (no event will fire), sync directly instead.
 *
 * `params` is optional: { jobId } for job-workspace,
 * { candidateId } or { jobId, candidateId } for candidate-workspace.
 */
export function navigate(view, params = {}) {
  if (!VIEWS.includes(view)) {
    console.warn(`[navigation] unknown view: ${view}`);
    return;
  }
  const target = buildHash(view, params);
  if (window.location.hash === target) {
    applyHash();
  } else {
    window.location.hash = target;
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
