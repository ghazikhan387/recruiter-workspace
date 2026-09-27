# Development Rules

## Rule 1 — Read Before Coding

Before changing code, read:

* PRD.md
* ARCHITECTURE.md
* DEVELOPMENT_RULES.md

Do not begin implementation until these have been considered.

## Rule 2 — Do Not Invent Requirements

Never invent product requirements when the PRD leaves something undefined.

Especially do not invent the final meanings of the nine job aspects.

Use placeholders until the product owner provides the definitions.

## Rule 3 — Small Changes

Implement one feature at a time.

Do not rebuild unrelated parts of the application.

Do not rewrite working code unnecessarily.

## Rule 4 — Preserve Existing Behavior

A new feature must not silently remove existing functionality.

Before making a large structural change, identify what existing behavior could be affected.

## Rule 5 — Performance

Prefer:

* simple code
* fewer dependencies
* smaller DOM
* targeted database queries
* local state
* asynchronous saves

Avoid:

* unnecessary abstractions
* global application state for everything
* unnecessary libraries
* unnecessary network requests
* polling unless required

## Rule 6 — Database

Use Supabase PostgreSQL.

Use Row Level Security.

Use targeted queries.

Never retrieve large datasets when the current screen requires only a small subset.

## Rule 7 — Job Aspect Saving

Each of the nine job aspects is independently editable and saveable.

Saving one aspect must never overwrite the others.

Example:

If Aspect 4 is changed, the update should modify Aspect 4 only.

## Rule 8 — Partial Jobs

A job may remain incomplete.

Do not require all nine aspects before allowing the recruiter to save the job.

## Rule 9 — Candidates

Candidates are global.

Use a candidate-job relationship for job-specific information.

Do not duplicate candidates.

## Rule 10 — Templates

Master templates and job-specific templates are separate.

Do not automatically overwrite existing job templates when the master changes.

## Rule 11 — Call Assistant

Branching logic must be represented as structured data and tested.

Do not hard-code the entire call flow into one enormous component.

## Rule 12 — Testing

For every meaningful feature:

1. implement
2. test the normal path
3. test an error path
4. test a persistence/reload path where applicable
5. check for regressions

Never claim a test passed unless it was actually performed.

## Rule 13 — Dependency Discipline

Before installing a library, ask:

Can this reasonably be implemented with the browser platform, Alpine.js, or existing project code?

If yes, prefer the existing approach.

## Rule 14 — Security

Never:

* expose secret keys
* disable RLS for convenience
* bypass authentication
* log unnecessary candidate information
* add insecure shortcuts to make development easier

## Rule 15 — Page Module Contract

Each page module (js/pages/*.js) exports:

* `render(container)` — fills the container with DOM nodes. Must be
  idempotent: calling it repeatedly replaces content without leaking
  listeners or timers.
* optionally `destroy()` — the lifecycle counterpart of `render`. The
  shell calls it when the recruiter navigates to a **different** view
  (never on re-renders of the same view). Any page that starts a
  debounce timer (e.g. the autosave required by PRD §35), an interval,
  or a store subscription **must** cancel it in `destroy()`.

Shared domain state follows one rule: **one store per domain**
(js/state/<domain>.js, created with createStore from js/state/store.js).
navigationStore is the only store allowed to decide *which* record is
shown; it carries `{ view, jobId, candidateId }` parsed from the URL
hash. Pages read their context (job id, candidate id) from
navigationStore and load records from their own domain store — they
must not create ad-hoc global state or reach into another domain's
store.

## Rule 16 — Build DOM Safely

Construct DOM exclusively with `createElement` / `setAttribute` /
`createTextNode` (use the shared `el()` helper from js/dom.js). Never
assign dynamic text through `innerHTML`, `outerHTML`, `document.write`,
or `eval`. This is mandatory for every feature that renders recruiter-
or CEIPAL-supplied text — especially template variable substitution
(PRD §13), where string-templating plus innerHTML would introduce a
stored-XSS vulnerability. Copy-to-clipboard payloads must use
plain-text APIs (`navigator.clipboard.writeText`).

## Rule 17 — Before Finishing a Task

Report:

* files changed
* features implemented
* tests performed
* unresolved problems
* any assumptions made
