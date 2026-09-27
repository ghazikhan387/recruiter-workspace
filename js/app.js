/**
 * js/app.js — application entry point
 * ------------------------------------------------------------------
 * Boots the lightweight shell:
 *   1. Registers the Alpine.js store for navigation state (if Alpine
 *      is present; the modules stay usable without it).
 *   2. Defines the `appShell()` Alpine component used by index.html.
 *   3. Starts hash-based navigation and renders placeholder pages.
 *
 * ES modules execute before deferred scripts, so this file always
 * runs before Alpine boots — the store and component are registered
 * in time.
 * ------------------------------------------------------------------
 */

import {
  VIEWS,
  VIEW_TITLES,
  navigationStore,
  navigate,
  startNavigation,
} from './state/navigation.js';
import { renderPage } from './pages/index.js';

/** Sidebar navigation items (order matters; matches PRD §40). */
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'jobs', label: 'Jobs' },
  { id: 'create-job', label: 'Create Job' },
  { id: 'job-workspace', label: 'Job Workspace' },
  { id: 'candidate-workspace', label: 'Candidate Workspace' },
  { id: 'talent-pool', label: 'Talent Pool' },
  { id: 'follow-ups', label: 'Follow-ups' },
  { id: 'quick-copy', label: 'Quick Copy' },
  { id: 'master-templates', label: 'Master Templates' },
];

/**
 * Alpine integration layer. The shell component reads/writes through
 * the same vanilla navigation store, keeping Alpine as a thin UI
 * binding rather than the owner of application state.
 */
function registerAlpineIntegration() {
  if (typeof window === 'undefined') return;

  // Expose data on window so tests / debugging can inspect boot state.
  window.RW = {
    views: VIEWS,
    navItems: NAV_ITEMS,
    navigationStore,
    navigate,
  };

  const Alpine = window.Alpine;
  if (!Alpine) return; // graceful: static shell still works without Alpine

  // Navigation store exposed to any Alpine component via $store.nav.
  Alpine.store('nav', {
    get view() {
      return navigationStore.getState().view;
    },
    navigate,
  });

  // Root shell component used by x-data="appShell()" in index.html.
  Alpine.data('appShell', () => ({
    navItems: NAV_ITEMS,

    get currentView() {
      return this.$store.nav.view;
    },

    get currentTitle() {
      return VIEW_TITLES[this.currentView] || 'Recruiter Workspace';
    },

    // Subtle save-state indicator slot (PRD §35). Always empty in the
    // foundation phase — no persistence implemented yet.
    saveStatus: '',

    navigate(view) {
      navigate(view);
    },
  }));
}

/** Re-render the active page whenever the navigation view changes. */
function bindRendering() {
  navigationStore.subscribe((state, changed) => {
    if (changed.includes('view')) {
      renderPage(state.view);
    }
  });
}

function boot() {
  registerAlpineIntegration();
  bindRendering();
  startNavigation(); // applies initial hash → renders default/active page
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}
