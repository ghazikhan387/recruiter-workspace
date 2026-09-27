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

  return {
    getState() {
      return state;
    },

    /**
     * Patch the state with a partial object and notify listeners.
     * Only keys whose values actually changed are reported.
     */
    setState(partial) {
      const changed = [];
      for (const [key, value] of Object.entries(partial)) {
        if (state[key] !== value) {
          state = { ...state, [key]: value };
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
