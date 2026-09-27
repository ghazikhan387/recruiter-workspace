/**
 * js/pages/master-templates.js — Master Templates (placeholder only)
 */
import { el } from '../dom.js';
import { card, placeholderText } from './placeholder.js';

export function render(container) {
  container.replaceChildren(
    card('Master Template Library', [
      placeholderText(
        'Placeholder \u2014 reusable recruiter defaults grouped by category (Call Assistant, Email, SMS, Voicemail, Job Details). ' +
          'New jobs receive copies of these templates; editing a master never overwrites existing jobs.'
      ),
    ])
  );
}
