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

## Rule 15 — Before Finishing a Task

Report:

* files changed
* features implemented
* tests performed
* unresolved problems
* any assumptions made
