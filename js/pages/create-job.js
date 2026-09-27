/**
 * js/pages/create-job.js — Create Job (placeholder only)
 *
 * IMPORTANT (PRD §9 / ARCHITECTURE.md / DEVELOPMENT_RULES Rule 2):
 * The exact names and meanings of the nine job aspects have NOT been
 * finalized in discovery. Do not invent labels or definitions here.
 * Until the product owner supplies them, we render neutral placeholders
 * "Job Aspect #1" ... "Job Aspect #9".
 */
import { el } from '../dom.js';
import { card, placeholderText } from './placeholder.js';

/** Number of structured job fields required by the PRD. */
export const JOB_ASPECT_COUNT = 9;

/** Neutral placeholder keys/labels — intentionally undefined in meaning. */
export function jobAspectPlaceholders() {
  return Array.from({ length: JOB_ASPECT_COUNT }, (_, i) => ({
    key: `aspect_${i + 1}`,
    label: `Job Aspect #${i + 1}`,
    note: 'Label and definition pending from product discovery.',
  }));
}

export function render(container) {
  const aspects = jobAspectPlaceholders().map((aspect) =>
    el('div', { class: 'field' }, [
      el('label', {}, aspect.label),
      el('input', { type: 'text', placeholder: aspect.note, disabled: '' }),
    ])
  );

  container.replaceChildren(
    card('New Job', [
      placeholderText(
        'Placeholder \u2014 creating a job collects nine independent structured aspects. ' +
          'The final labels for these fields are pending; they must be supplied before this feature is implemented.'
      ),
      ...aspects,
    ])
  );
}
