# Recruiter Workspace Architecture

## Product Goal

Build a lightweight recruiter productivity application.

The application must prioritize:

* very fast interaction
* low browser memory usage
* minimal JavaScript
* minimal dependencies
* long-running browser sessions
* simple maintainable architecture

The application is a productivity layer alongside CEIPAL, not an ATS replacement.

## Frontend

Use:

* HTML
* Alpine.js
* Vanilla JavaScript modules
* Vanilla CSS

Do not introduce:

* React
* Next.js
* Vue
* Angular
* Svelte
* Tailwind
* Bootstrap
* Redux
* Zustand
* large UI component libraries

unless explicitly approved later.

## Backend

Use Supabase for:

* PostgreSQL
* Authentication
* persistence
* Row Level Security

The frontend may communicate with Supabase through its public/publishable client key.

Never expose a Supabase secret/service-role key in browser code.

## Hosting

Use Vercel.

## Git

GitHub is the source of truth.

Use feature branches for meaningful changes.

Do not make unrelated changes while implementing a feature.

## Performance

Performance is a first-class product requirement.

Rules:

1. Do not load the entire application's dataset into browser memory.
2. Load only data required by the current page.
3. Keep active interaction state local to the relevant page/component.
4. Database operations must not block typing or normal UI interaction.
5. Avoid unnecessary polling.
6. Avoid unnecessary timers and listeners.
7. Avoid unnecessary animations.
8. Avoid large client-side state stores.
9. Keep the DOM reasonably small.
10. Prefer browser-native APIs when practical.
11. Prefer simple code over abstraction-heavy code.
12. Do not add dependencies without a concrete need.

## Job Creation

Creating a job must use a dedicated page.

Each job contains nine independent structured job aspects.

The exact names and definitions of the nine aspects have not yet been finalized.

Therefore:

* do not invent their final meanings
* do not invent final labels
* keep them represented as placeholders until explicitly defined

Each aspect must be independently editable and independently saved.

Saving Aspect 3 must update only Aspect 3.

A partially completed job must be allowed.

The recruiter must be able to leave the page and return later.

## Pages

Primary pages:

* Dashboard
* Jobs
* Create Job
* Job Workspace
* Candidate Workspace
* Talent Pool
* Follow-ups
* Quick Copy
* Master Templates

## Candidate Architecture

Candidates are global records.

A candidate can be associated with many jobs.

Do not create a duplicate candidate record for every job.

Global information belongs to the candidate.

Job-specific interaction information belongs to the candidate-job relationship.

## Templates

Master templates are reusable defaults.

When a job is created, the master template pack is copied into job-specific templates.

Editing an existing job template must not modify the master template.

Editing the master must not automatically overwrite existing job templates.

## Call Assistant

The Call Assistant is a branching state machine.

A step can contain:

* purpose
* recruiter script
* responses
* branch destinations
* captured data

Do not implement the Call Assistant as one large static document.

## Persistence

Local UI state should update immediately.

Persistence should happen asynchronously.

Show subtle save state such as:

Saving...

Saved

Normal typing must never wait for a database request.

## Security

Supabase Row Level Security is mandatory.

All user-owned application records must be protected by appropriate policies.

Never expose service-role or secret keys to browser code.

## Scope

Do not implement the following in MVP unless explicitly requested:

* CEIPAL scraping
* CEIPAL automation
* resume parsing
* full ATS functionality
* payroll
* client management
* candidate matching AI
* browser extension
* team collaboration
* complex analytics

Follow the PRD.
