/**
 * js/pages/candidate-workspace.js — Candidate Workspace (placeholder only)
 */
import { el, card, placeholderText } from './placeholder.js';

export function render(container) {
  container.replaceChildren(
    card('Candidate Information', [
      placeholderText('Placeholder \u2014 global candidate record: contact fields, structured preferences, tags, notes.'),
    ]),
    card('Quick Copy', [
      placeholderText('Placeholder \u2014 one-click copy of call script / voicemail / RTR email / SMS / job details.'),
    ]),
    card('Call Assistant', [
      placeholderText('Placeholder \u2014 branching multi-step call flow (not implemented in the foundation phase).'),
    ])
  );
}
