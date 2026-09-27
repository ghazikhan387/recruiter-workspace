# Recruiter Workspace — Foundation Shell

Lightweight recruiter productivity application (see `PRD.md`,
`ARCHITECTURE.md`, `DEVELOPMENT_RULES.md`). This repository currently
contains **only the project foundation**: a runnable application shell
with navigation and placeholder pages. No feature logic is implemented
yet.

## Stack

- HTML
- Alpine.js 3.14.9 (vendored in `vendor/` — the only dependency)
- Vanilla JavaScript ES modules
- Vanilla CSS

No React, Next.js, Tailwind, Bootstrap, or state-management libraries.
No build step. No package installation required to run the app.

## Run

```bash
python3 -m http.server 5173
# then open http://localhost:5173
```

(or `npm start`, which runs the same command; npm itself is not needed)

## Test / validate

```bash
npm test                # unit tests (navigation, store, boot, lifecycle, guards)
node --test tests/*.test.js   # same suite, run directly
node --check js/app.js    # syntax check any module
```

## Directory structure

```
index.html              Application shell + navigation (Alpine bindings)
css/
  base.css              Reset, design tokens, typography
  layout.css            Sidebar + main area layout
  components.css        Cards, buttons, chips, forms (placeholder styles)
js/
  app.js                Entry point: Alpine wiring, page lifecycle (render/destroy), boot
  dom.js                Generic el() DOM builder (createElement only — never innerHTML)
  state/
    store.js            Tiny vanilla subscribe/notify store helper
    navigation.js       Hash routing incl. resource ids (#/job-workspace/:jobId,
                        #/candidate-workspace/:jobId?/:candidateId), no router library
  pages/
    placeholder.js      Throwaway card/list helpers for placeholder pages only
    index.js            View-id → page-module registry
    dashboard.js        Placeholder
    jobs.js             Placeholder
    create-job.js       Placeholder — nine neutral "Job Aspect #N" fields
    job-workspace.js    Placeholder
    candidate-workspace.js  Placeholder
    talent-pool.js      Placeholder
    follow-ups.js       Placeholder
    quick-copy.js       Placeholder
    master-templates.js Placeholder
vendor/
  alpine.min.js         Alpine.js 3.14.9 (pinned, checksum recorded in README)
tests/                  Node built-in test runner suites (npm test)
```

## Deliberate non-decisions

- The **nine job aspects** are rendered as neutral placeholders
  (`Job Aspect #1 … #9`). Their final names and meanings are pending
  product discovery and **must not be invented** (PRD §9, Rule 2).
- Not implemented (by design, this phase): candidate management, call
  assistant, template engine, talent pool behavior, follow-ups behavior,
  CEIPAL integration, analytics, Supabase persistence/auth.
- Routing carries resource identity ({ view, jobId, candidateId }) so
  Job/Candidate Workspaces can address specific records, but no data
  layer exists yet — pages ignore the ids for now.
- CSP headers: none yet; add `connect-src` restriction when the
  Supabase client is wired in.
- Persistence layer: none yet. The top bar exposes an empty save-status
  slot reserved for the future async "Saving… / Saved" indicator.
