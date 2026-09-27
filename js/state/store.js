/**
 * js/state/store.js
 * ------------------------------------------------------------------
 * Tiny shared-state helper for vanilla ES modules.
 *
 * Keeps a plain object plus a Set of listeners. No framework, no
 * proxy magic — components subscribe explicitly and get notified
 * when relevant slices change. Intentionally minimal per
 * ARCHITECTURE.md ("avoid large client-side state stores").
 * ------------------------------------------------------------------
 */

export function createStore(initialState = {}) {
  let state = { ...initialState };
  const listeners = new Set();
  // Keys explicitly set via setState at least once. Needed so the FIRST
  // transition to a value still equal to the initial default notifies
  // listeners (e.g. boot applying "#/ → dashboard" when the store was
  // created with view: 'dashboard'). Without this, subscribers would
  // miss the very first render on a fresh page load.
  const touched = new Set();

  return {
    getState() {
      return state;
    },

    /**
     * Patch the state with a partial object and notify listeners.
     * A key counts as changed if its value differs from the current
     * one, or if it is being set explicitly for the first time.
     */
    setState(partial) {
      const changed = [];
      for (const [key, value] of Object.entries(partial)) {
        if (state[key] !== value || !touched.has(key)) {
          state = { ...state, [key]: value };
          touched.add(key);
          changed.push(key);
        }
      }
      if (changed.length > 0) {
        for (const listener of listeners) {
          listener(state, changed);
        }
      }
      return changed;
    },

    /**
     * Subscribe to state changes. Returns an unsubscribe function.
     */
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
