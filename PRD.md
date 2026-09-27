# Product Requirements Document (PRD)

## 1. Product Overview

### Product Name

**Recruiter Workspace**
Working name; final product name can be decided later.

### Product Summary

Recruiter Workspace is a lightweight, fast web application designed to replace Word documents and scattered notes currently used by recruiters for scripts, candidate call workflows, quick-copy messages, candidate notes, tags, and future-candidate tracking.

The application works **alongside CEIPAL**:

* **CEIPAL remains the source of truth for finding candidates and reviewing resumes.**
* Recruiter Workspace stores the information and workflow needed to contact, qualify, track, and follow up with those candidates.
* The application is optimized for a recruiter who normally works on **2–3 jobs per day and one candidate at a time**.

The product should feel like a fast desktop productivity tool rather than a traditional ATS or large business application.

---

# 2. Problem

The current workflow relies heavily on Word files and manually maintained information.

Typical workflow:

```text
Search candidate in CEIPAL
        ↓
Open candidate
        ↓
Review resume
        ↓
Open Word document
        ↓
Find appropriate script
        ↓
Copy/edit script
        ↓
Call candidate
        ↓
Remember or manually record outcome
        ↓
Return to Word / other notes
```

This creates several problems:

* Scripts are difficult to organize by job.
* Repetitive text must be manually copied and edited.
* Candidate information has to be entered repeatedly.
* Call conversations are difficult to follow consistently.
* Candidate preferences can be forgotten after a call.
* Good candidates who are not suitable for today's job can be lost.
* There is no convenient central place for future candidates and follow-ups.
* Long text is inconvenient to send through communication tools.
* Editing and maintaining Word documents is slower than a dedicated interface.

---

# 3. Product Vision

Create a **personal recruiter command center** that allows a recruiter to move through the recruiting workflow with as few clicks as possible.

The core experience should be:

```text
Open Job
   ↓
Open / Add Candidate
   ↓
Review Candidate in CEIPAL
   ↓
Run Call Assistant
   ↓
Copy Script / Email / SMS / Job Details
   ↓
Record Outcome
   ↓
Capture Tags + Preferences + Notes
   ↓
Set Follow-up
   ↓
Move to Next Candidate
```

For candidates who are not suitable for the current job but are valuable for future opportunities:

```text
Candidate
   ↓
Future Candidate / Talent Pool
   ↓
Tags + Preferences + Notes
   ↓
Future Follow-up
```

---

# 4. Product Principles

## 4.1 Speed First

The application should feel instant during active recruiting work.

Typing, opening modals, switching scripts, changing tabs, filtering, and copying text should happen locally without waiting for database operations.

## 4.2 Minimalism

The app should not become an ATS replacement.

CEIPAL already handles candidate search and resumes. Recruiter Workspace should store only what helps the recruiter work faster.

## 4.3 One Candidate at a Time

The active workspace should focus on one candidate at a time.

The recruiter should never need to navigate through multiple pages during an active call.

## 4.4 Everything Frequently Used Should Be One Click Away

High-frequency actions should require a single obvious action:

* Copy
* Edit
* Next Candidate
* Add Tag
* Add Note
* Set Follow-up

## 4.5 Structured Data Where It Helps

Repeatedly used information should be structured instead of buried in notes.

Examples:

* Preferred role
* Preferred pay
* Preferred location
* Shift preference
* Employment preference
* Best contact time

---

# 5. Target User

### Primary User

A recruiter who:

* works on a small number of jobs each day;
* searches candidates through CEIPAL;
* reviews resumes before contacting candidates;
* contacts candidates by phone, SMS, and email;
* uses reusable recruiting scripts;
* needs quick copying during live calls;
* needs lightweight candidate notes and follow-up tracking.

### Usage Pattern

Primary workflow:

* Desktop/laptop
* Browser-based
* Used for long periods during working hours
* Often used beside CEIPAL
* One active candidate at a time

---

# 6. What the Product Is Not

The MVP should **not** attempt to replace CEIPAL.

Out of scope for MVP:

* Candidate resume database replacement
* Full ATS functionality
* Job submission management
* Client management
* Payroll
* Interview scheduling system
* Recruiting analytics platform
* Candidate resume parsing from CEIPAL
* CEIPAL scraping
* Full CRM automation
* Team collaboration workflows unless required later

The app should remain a **recruiter productivity layer**.

---

# 7. Core Application Structure

The application should contain the following primary sections:

```text
Dashboard
│
├── Jobs
│   ├── Active Jobs
│   └── Job Workspace
│
├── Talent Pool
│
├── Follow-ups
│
├── Quick Copy
│
└── Master Templates
```

---

# 8. Dashboard

The dashboard should be intentionally simple.

## Dashboard Content

### Today's Work

Show the jobs currently being worked on.

Example:

```text
Today's Jobs

RN Cardiac Neuro Tele
12 Candidates

ICU RN
8 Candidates

Med Surg RN
5 Candidates
```

### Follow-ups

Show candidates requiring attention.

```text
Follow-ups Today

John Smith
Good Candidate
Call after 5 PM

Sarah Jones
ICU RN
Follow up today
```

### Quick Actions

* Open Job
* Create Job
* Add Candidate
* Quick Copy
* Talent Pool

The dashboard should not become a large analytics page.

---

# 9. Job Management

## Create Job

The recruiter should be able to create a new job.

Creating a job should collect:

1. Job Aspect #1
2. Job Aspect #2
3. Job Aspect #3
4. Job Aspect #4
5. Job Aspect #5
6. Job Aspect #6
7. Job Aspect #7
8. Job Aspect #8
9. Job Aspect #9

### Important Product Rule

The exact names and meanings of the **nine job aspects have not yet been finalized in discovery**.

The implementation should therefore support **nine structured job fields**, but the final field labels and definitions must be supplied before development is considered complete.

These fields should be stored independently rather than as one large job description.

## Job Data Should Feed Other Features

The nine job aspects become the source data for:

* Call scripts
* Emails
* RTR
* SMS
* Fast Copy Job Details
* Candidate qualification questions
* Job summary

Example:

```text
{{job_title}}
{{facility}}
{{location}}
{{pay}}
{{shift}}
...
```

---

# 10. Default Job Template Pack

When a new job is created, it should automatically receive a copy of the current Master Template Pack.

Example:

```text
New Job
  ↓
Default Template Pack
  ↓
Job-specific Templates
```

A new job should immediately contain templates such as:

### Call Assistant

* Introduction
* Purpose of Call
* Job-Seeking Status
* Qualification
* Candidate Verification
* Closing

### Email

* Initial Contact
* Follow-up
* RTR

### Voicemail

* Standard Voicemail

### SMS

* Initial Contact
* Follow-up

### Questions

* Screening Questions

The exact default pack should be editable through Master Templates.

---

# 11. Master Templates

Master Templates are reusable recruiter defaults.

They are not the same as job-specific templates.

## Master Template Behavior

When a new job is created:

```text
Master Template
       ↓
Copied into Job
       ↓
Job-specific Template
```

Editing a job-specific template must **not** modify the master.

Editing the master must **not automatically overwrite existing jobs**.

The master primarily affects future jobs.

## Job Template Controls

A job-specific template should support:

* Edit
* Save
* Copy
* Reset to Master
* Update from Master

---

# 12. Template Editor

Every script should be editable in a dedicated window/modal.

The editor should provide a large, comfortable writing area rather than forcing the recruiter to edit text directly in a small card.

Example:

```text
Edit RTR Email

Subject
[................................................]

Body
┌───────────────────────────────────────────────┐
│                                               │
│ Template text                                 │
│                                               │
│ {{candidate_name}}                            │
│ {{job_title}}                                 │
│                                               │
└───────────────────────────────────────────────┘

Character count: 427

[Cancel] [Save]
```

The editor should support template variables.

---

# 13. Dynamic Template Variables

Templates can contain variables that are replaced automatically.

Examples:

```text
{{candidate_name}}
{{phone}}
{{email}}
{{address}}
{{pincode}}

{{job_title}}
{{facility}}
{{location}}
{{pay}}
{{shift}}
```

Example:

Template:

> Hi {{candidate_name}}, I’m calling regarding the {{job_title}} opportunity.

Generated:

> Hi John Smith, I’m calling regarding the RN Cardiac Neuro Tele opportunity.

The same variable system should be usable by:

* Call scripts
* Emails
* RTR
* SMS
* Voicemail where appropriate
* Quick Copy where applicable
* Job Details

---

# 14. Call Assistant

The existing interactive call assistant is a core product feature.

It should preserve the current successful interaction model:

```text
Phase
Step Counter
Purpose
Recruiter Says
Candidate Response
Recruiter Says Next
Navigation
Progress
```

Example:

```text
Phase 1: Introduction & Consent

Step 3 / 30

Purpose
Check Job-Seeking Status

What Recruiter Says

"Are you currently looking for a new opportunity..."

Candidate Response

[Yes / Open]
[Not Interested]
```

The interface should continue supporting:

* Step navigation
* Progress indicator
* Current step
* Completed steps
* Back
* Continue
* End Call
* Restart
* Direct jump to a step
* Copy current script

---

# 15. Branching Call Logic

The call assistant is not simply a linear document.

Each step should support:

```text
Question
   ↓
Possible Response
   ↓
Next Step / Branch
```

Data structure concept:

```text
Step
├── Purpose
├── Recruiter Script
├── Responses
│   ├── Response A
│   │   └── Next Step
│   ├── Response B
│   │   └── Next Step
│   └── Response C
│       └── Next Step
└── Data to Capture
```

This should allow the recruiter to follow the conversation naturally.

---

# 16. Call Script Content Guidelines

Questions used in the call assistant should generally be:

* Open-ended
* Conversational
* Confirming
* Probing when more information is needed

The script should avoid relying exclusively on yes/no questions.

Example structure:

### Open-ended

> What type of opportunity would you ideally be interested in next?

### Confirming

> So you're primarily looking for night-shift opportunities, correct?

### Probing

> You mentioned you're considering a change. What is prompting you to explore something new?

### Follow-up probing

> What would make the next opportunity a better fit for you?

The Master Call Assistant Editor should allow these questions and their branches to be edited.

---

# 17. Not Interested Workflow

A critical requirement is that:

**Not interested in today's job does not automatically mean the candidate is lost.**

When a candidate says they are not interested in the offered job, the call assistant should allow the recruiter to move into a **Future Opportunity / Preferences** branch.

The recruiter should capture:

1. Preferred Role
2. Preferred Pay
3. Preferred Location
4. Contract or Permanent Preference
5. Preferred Shift
6. Preferred Time to Call
7. Best Email
8. Best Phone Number

Additional probing questions should be available to understand the candidate's preferences.

Example:

```text
Candidate is not interested in this job.

Ask:

"What kind of opportunity would be a better fit for you?"

"What pay range would you be targeting for your next opportunity?"

"What locations would you be comfortable considering?"

"Would you prefer contract opportunities, permanent positions, or are you open to both?"

"What shift works best for you?"

"When is the best time for us to contact you if we find something matching those preferences?"
```

Once captured, the candidate can be added to the Talent Pool.

---

# 18. Candidate Management

Candidates should exist **globally**, rather than being duplicated separately for every job.

A candidate can be associated with multiple jobs.

Example:

```text
John Smith
│
├── RN Med Surg
│   └── Contacted
│
├── ICU
│   └── Not Suitable
│
└── Talent Pool
    └── Good Candidate
```

## Core Candidate Fields

The candidate record should support:

* Full Name
* Phone
* Email
* Address
* Pincode
* Preferred Role
* Preferred Pay
* Preferred Location
* Contract / Permanent Preference
* Preferred Shift
* Best Contact Time
* Tags
* Notes
* Follow-up Date
* Job relationships
* Call history

The app should avoid unnecessarily duplicating information already maintained in CEIPAL.

---

# 19. Candidate / Job Relationship

A candidate's interaction with a particular job should be stored separately from the global candidate record.

Example:

```text
Candidate
  John Smith

Job
  RN Med Surg

Relationship
  Contacted

Job Outcome
  Not Interested

Job-specific Notes
  Prefers ICU instead
```

This allows the same candidate to be considered for multiple jobs without recreating their profile.

---

# 20. Candidate Workspace

The candidate workspace is the primary working area during recruiting.

Example structure:

```text
RN Cardiac Neuro Tele

Candidate: John Smith
────────────────────────────────────────────

Candidate Information
Phone
Email
Address

Tags
[Good Candidate]
[Looking for Job]
[Night Shift]

Notes
[...................................]

────────────────────────────────────────────

Quick Copy

[Call Introduction]
[Voicemail]
[RTR Email]
[SMS]
[Job Details]

────────────────────────────────────────────

Call Assistant

Step 11 / 30

[Recruiter Script]

[Candidate Response]

[Back] [Continue] [End Call]
```

The recruiter should be able to perform most work from this screen.

---

# 21. Candidate Notes

Candidates should support notes.

Notes should preferably be timestamped.

Example:

```text
Sep 27, 3:15 PM
Interested in ICU opportunities.
Prefers night shift.
Available after 5 PM.

Sep 28, 10:30 AM
Follow-up completed.
```

Notes should remain separate from structured fields and tags.

---

# 22. Tags

Candidates should support multiple tags.

Tags should behave as selectable chips rather than one mutually exclusive status.

Possible examples:

* Looking for Job
* Not Interested
* Has Permanent Job
* Good Candidate
* Night Shift
* Follow Up
* Future Opportunity

The system should also support custom tags.

Tags should be searchable and filterable.

---

# 23. Status vs Tags

These concepts should remain separate.

### Status

Describes the candidate's current situation.

Examples:

* Contacted
* Interested
* Not Interested
* Follow Up
* Future Opportunity

### Tags

Describe useful characteristics.

Examples:

* Good Candidate
* Night Shift
* ICU
* Relocation
* Immediate Start

This prevents tags from becoming an unstructured replacement for candidate status.

---

# 24. Talent Pool

Talent Pool is a dedicated page for candidates the recruiter wants to remember for future opportunities.

Example:

```text
Talent Pool

Search...

John Smith
⭐ Good Candidate
ICU
Night Shift
Follow-up: Oct 2

Sarah Jones
Good Candidate
Med Surg
Contract
Follow-up: Oct 5
```

## Talent Pool Actions

* Search
* Filter by tag
* Open candidate
* View preferences
* View notes
* View previous jobs
* Set reminder
* Add/remove tags
* Return candidate to active job

The Talent Pool should make it easy to answer:

> "Who are the good candidates I should contact when I get another suitable job?"

---

# 25. Follow-ups

A dedicated Follow-ups page should show candidates requiring future action.

Example:

```text
TODAY

John Smith
Call after 5 PM

Sarah Jones
Send new ICU opportunities

UPCOMING

Mike Brown
Oct 2

David Lee
Oct 5
```

Follow-up dates can be attached to candidates.

The feature should remain lightweight rather than becoming a full task-management application.

---

# 26. Job-wise Candidate Segregation

Each Job Workspace should display the candidates associated with that job.

Example:

```text
RN Med Surg

All Candidates: 12

New: 5
Contacted: 4
Interested: 2
Not Interested: 1
```

Selecting a candidate opens their workspace.

The recruiter should be able to move through the job's candidates one at a time using:

* Previous Candidate
* Next Candidate

This reflects the actual working style.

---

# 27. Fast Copy

Fast Copy is one of the most important features of the application.

It should be available inside a Job Workspace and Candidate Workspace.

Possible actions:

```text
[Copy Call Script]
[Copy Voicemail]
[Copy RTR]
[Copy SMS]
[Copy Job Details]
```

The copy interaction should immediately confirm success.

Example:

```text
[✓ Copied]
```

No page navigation should be required.

---

# 28. Fast Copy — Job Details

The application should automatically generate a recruiter-friendly Job Details message from the nine job aspects.

The recruiter should not need to manually write the same job summary again.

Example:

```text
RN Cardiac Neuro Tele

Location: Sanford, FL
Facility: HCA Florida Lake Monroe Hospital
Pay: $30.75–$44.68/hr W2
Shift: Day / Night
...
```

The Job Details format should itself be editable as a master template.

---

# 29. Character Limit Handling

The system should support a configurable copy limit.

### MVP Default

```text
500 characters
```

Before copying:

```text
438 / 500
```

If the generated text exceeds the configured limit, the application should intelligently split it.

Example:

```text
Job Details — Part 1
438 / 500

[Copy Part 1]
```

```text
Job Details — Part 2
412 / 500

[Copy Part 2]
```

The split should occur at logical boundaries such as:

* Paragraphs
* Sections
* Sentences

It should never arbitrarily cut a word or sentence where avoidable.

If the complete content cannot fit into two parts while respecting the configured limit, the UI should clearly report the overflow and allow the recruiter to edit the generated content.

---

# 30. Quick Copy Page

Quick Copy is a standalone library for frequently used pieces of text that are not tied to a specific job or candidate.

Examples:

* Resume request
* General follow-up
* Candidate availability message
* General recruiter response
* Frequently used SMS
* Frequently used email text

Each item should support:

* Name
* Text
* Optional category
* Favorite / Pin
* Edit
* Delete
* Copy

Example:

```text
Quick Copy

Search...

⭐ Updated Resume Request
"Please send me your latest updated resume..."

[Copy] [Edit]

Candidate Follow-up
"Hi {{candidate_name}}, just following up..."

[Copy] [Edit]
```

The page should be extremely fast to use.

---

# 31. Quick Copy Search

Search should operate locally on loaded Quick Copy data.

The user should be able to search by:

* Title
* Text
* Category

Pinned items should be shown prominently.

---

# 32. Master Template Library

The Master Template page should provide a central place to maintain reusable recruiting content.

Example:

```text
Master Templates

CALL ASSISTANT
Introduction
Qualification
Candidate Preferences
Closing

EMAIL
Initial Contact
Follow-up
RTR

SMS
Initial Contact
Follow-up

VOICEMAIL
Standard

JOB DETAILS
Default Job Summary
```

Every template should support:

```text
[Edit]
```

Clicking Edit opens the template editor modal.

---

# 33. Data Relationships

Conceptual data model:

```text
User
 │
 ├── Jobs
 │     │
 │     ├── Job Templates
 │     │
 │     └── Candidate Relationships
 │
 ├── Candidates
 │     │
 │     ├── Tags
 │     ├── Notes
 │     ├── Preferences
 │     ├── Call History
 │     └── Follow-ups
 │
 ├── Master Templates
 │
 └── Quick Copy Items
```

A candidate can belong to multiple jobs.

---

# 34. Call History

Each completed or ended call should be capable of producing a call record.

A call record should include:

* Candidate
* Job
* Date/time
* Outcome
* Tags added
* Notes
* Preferences captured
* Follow-up date

This allows the recruiter to understand previous interactions without recreating information.

---

# 35. Persistence and Saving

The UI should remain responsive while the database operates in the background.

### Desired behavior

```text
User types
   ↓
Local UI state updates immediately
   ↓
Save occurs asynchronously
```

The product should not make every keystroke wait for the server.

Save triggers may include:

* Explicit Save
* Switching candidate
* Switching job
* Leaving editor
* Debounced autosave where appropriate

The UI should provide a subtle save state:

```text
Saving...
Saved
```

without interrupting the workflow.

---

# 36. Technology Architecture

### Frontend

**HTML + Alpine.js + CSS**

Rationale:

* Lightweight
* Small JavaScript footprint
* Appropriate for forms, modals, state, tabs, and interactive call flows
* No need for a heavy SPA framework
* Easier to keep memory usage low

### Backend

**Supabase**

Used for:

* PostgreSQL database
* Authentication
* API access
* Persistence
* Row Level Security

### Hosting

**Vercel**

Used for:

* Static frontend hosting
* Deployment
* CDN delivery

A static frontend should communicate with Supabase directly using secure client-side access patterns and database security rules.

---

# 37. Security Requirements

The application stores candidate personal information and therefore must treat it as sensitive business data.

Requirements:

* Authentication should be enabled.
* Every database record should belong to an authenticated user.
* Supabase Row Level Security should be enabled.
* The Supabase service-role key must never be exposed in browser code.
* Candidate data should not be included unnecessarily in analytics or logging.
* HTTPS must be used.
* Access should be limited to authorized users.
* Data retention and employer/company policies should be reviewed before deployment.

The application should not automatically import or scrape candidate data from CEIPAL unless a properly authorized integration is added later.

---

# 38. Performance Requirements

The application is explicitly performance-first.

### Requirements

* Fast initial page load
* Minimal JavaScript dependencies
* Avoid unnecessary client-side libraries
* Avoid large UI frameworks
* Avoid unnecessary animations
* No blocking database request before the UI becomes usable
* Local UI state for active interactions
* Client-side filtering/search where practical
* Lazy-load data that is not immediately needed
* Keep DOM complexity reasonable

### Perceived Performance

The user should be able to:

* open a job,
* open a candidate,
* switch a script,
* edit a template,
* and copy text

without noticeable waiting.

Performance should be evaluated especially on a browser session that has remained open for several hours.

---

# 39. UI Requirements

The UI should take inspiration from the user's existing Call Assistant:

* Clean card-based layout
* Clear hierarchy
* Desktop-first design
* Strong primary action
* Progress indicator for calls
* Right-side step navigation for call flows
* Clear copy buttons
* Large readable script areas
* Modal editing windows
* Minimal visual clutter
* Fast transitions
* No excessive animation

The existing visual design should evolve rather than be completely discarded.

---

# 40. Navigation

Suggested navigation:

```text
Dashboard

Jobs
  Active Jobs

Talent Pool

Follow-ups

Quick Copy

Master Templates
```

The active Job Workspace should provide contextual navigation without forcing the user back to the main dashboard.

---

# 41. Search

Search should exist in the areas where it provides meaningful time savings.

### Search Candidates

Search globally by:

* Name
* Phone
* Email
* Tag

### Search Jobs

Search by job title and other identifying fields.

### Search Quick Copy

Search by title or content.

### Search Talent Pool

Search by candidate and tags.

Search should primarily run client-side for already loaded datasets where practical.

---

# 42. MVP Scope

## P0 — Must Have

### Job Management

* Create job
* Edit job
* Store nine job aspects
* Open active job
* Job-specific candidate list

### Candidate

* Create candidate
* Name
* Phone
* Email
* Address
* Pincode
* Global candidate record
* Job relationship

### Templates

* Master templates
* Default template pack
* Job-specific template copies
* Template editor modal
* Dynamic variables
* Copy

### Call Assistant

* Multi-step flow
* Responses
* Branching
* Progress
* Back
* Continue
* Restart
* End call
* Copy script

### Candidate Tracking

* Tags
* Notes
* Call outcome
* Candidate preferences
* Follow-up date
* Call history
* Talent Pool

### Fast Copy

* Job Details generation
* SMS / text limit
* Character counter
* Intelligent Part 1 / Part 2 splitting
* One-click copy

### Quick Copy

* Create text
* Edit text
* Delete text
* Copy
* Search
* Favorite / Pin

---

# 43. P1 Features

Potential next-phase improvements:

* Keyboard shortcuts
* Command palette
* More advanced template variables
* Template version history
* Duplicate job
* Duplicate candidate relationship
* Custom tag management
* Better call analytics
* Saved filters
* More sophisticated reminders
* Bulk candidate actions
* Offline caching / PWA behavior

---

# 44. Future Possibilities

These should not be required for MVP, but the architecture should not block them:

* CEIPAL integration
* Candidate import
* Resume metadata retrieval
* Browser extension
* Team accounts
* Shared master templates
* Role-based permissions
* Cross-device synchronization
* Mobile companion
* AI-assisted call notes
* AI-assisted candidate-job matching

The current product should remain useful without any of these.

---

# 45. Example End-to-End Workflow

## Scenario

Recruiter receives an RN Cardiac Neuro Tele job.

### Step 1 — Create Job

Recruiter enters the nine job aspects.

System creates:

```text
RN Cardiac Neuro Tele
```

and automatically generates its default template pack.

### Step 2 — Open CEIPAL

Recruiter searches candidates in CEIPAL.

### Step 3 — Review Candidate

Recruiter opens the candidate and reviews their resume.

### Step 4 — Add Candidate

Recruiter adds the candidate to the current job in Recruiter Workspace.

### Step 5 — Open Candidate Workspace

Candidate details are entered or confirmed.

### Step 6 — Start Call

Recruiter launches the interactive Call Assistant.

### Step 7 — Branch

Candidate says:

> "I'm not interested in this position."

The assistant does not simply terminate the process.

It transitions to:

```text
Future Opportunity Preferences
```

### Step 8 — Capture Preferences

Recruiter asks:

* Preferred role
* Preferred pay
* Location
* Contract/permanent
* Shift
* Best call time
* Email
* Phone

### Step 9 — Save Candidate

Recruiter adds:

```text
Good Candidate
Looking for Job
Future Opportunity
```

Adds notes and sets a follow-up.

### Step 10 — Talent Pool

Candidate appears in Talent Pool.

### Step 11 — New Job

Later, recruiter receives an ICU night-shift opportunity.

Recruiter can search Talent Pool and identify candidates whose preferences may match.

---

# 46. UX Success Criteria

The product is successful when the recruiter can perform the following with minimal navigation:

```text
Create Job
→ Open Candidate
→ Start Call
→ Copy Script
→ Follow Branch
→ Record Outcome
→ Capture Preferences
→ Add Note
→ Set Reminder
→ Next Candidate
```

The most important measure is **reduction in repetitive manual work**, not the number of features.

---

# 47. Product Success Metrics

For the MVP, useful measurements include:

### Workflow Efficiency

* Average clicks required to copy a script
* Time required to open a candidate workspace
* Time required to start a call
* Time required to record a call outcome

### Usage

* Jobs created
* Candidates worked
* Calls completed
* Templates copied
* Quick Copy usage
* Talent Pool usage
* Follow-ups completed

### Reliability

* Failed saves
* Failed copy actions
* Data loss incidents
* Application errors

### Performance

* Initial load performance
* Navigation latency
* Template switch latency
* Database request latency
* Memory usage during long sessions

---

# 48. Important Product Rules

1. **CEIPAL is the candidate/resume source.**

2. **Recruiter Workspace is not a replacement ATS.**

3. **Candidates exist globally and can belong to multiple jobs.**

4. **Job-specific templates are independent copies of master templates.**

5. **Changing the Master Template does not automatically overwrite existing jobs.**

6. **Not Interested in one job does not automatically discard a candidate.**

7. **Candidate preferences should be structured data, not only notes.**

8. **Tags and statuses should be separate concepts.**

9. **The active workflow should focus on one candidate at a time.**

10. **Frequently used actions should be one click away.**

11. **Database operations should not block typing or normal interaction.**

12. **Generated job-detail messages should respect the configurable character limit.**

13. **The nine job aspects are the source data for generated job-detail content.**

14. **Quick Copy content is independent from Jobs and Candidates.**

15. **The UI should remain lightweight and desktop-focused.**

---

# 49. Open Product Decisions

The following should be finalized before implementation:

### Nine Job Aspects

The exact nine fields need to be defined.

### Default Master Template Pack

The exact initial scripts and flows need to be provided.

### Default Candidate Tags

The first predefined tag library should be finalized.

### Call Outcomes

A controlled list of standard outcomes should be finalized.

### Reminder Behavior

Decide whether reminders are only shown inside the application or should later support notifications.

### Authentication

Decide whether the MVP is strictly one recruiter account or whether multi-user architecture should be supported from the beginning.

---

# 50. Final Product Definition

Recruiter Workspace is a **lightweight recruiter productivity application** built around five major capabilities:

```text
1. JOB WORKSPACE
   Store structured job information
   and job-specific recruiting content.

2. CALL ASSISTANT
   Guide recruiters through interactive,
   branching candidate conversations.

3. CANDIDATE MEMORY
   Store notes, tags, preferences,
   outcomes, and follow-ups.

4. TALENT POOL
   Preserve good candidates for future
   opportunities.

5. FAST COPY
   Instantly copy scripts, emails,
   SMS, voicemail, and generated job details.
```

The intended architecture is:

```text
              ┌───────────────────────┐
              │        CEIPAL         │
              │ Candidate Search      │
              │ Resume / ATS          │
              └───────────┬───────────┘
                          │
                    Candidate Found
                          │
                          ▼
              ┌───────────────────────┐
              │ Recruiter Workspace   │
              └───────────┬───────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
      Jobs          Candidate        Master Templates
        │             Workspace             │
        │                 │                 │
        │          ┌──────┼──────┐          │
        │          ▼      ▼      ▼          │
        │        Tags   Notes  Call Flow    │
        │                 │                 │
        │                 ▼                 │
        │            Talent Pool            │
        │                                   │
        └───────────────┬───────────────────┘
                        ▼
                   Fast Copy
```

The product should feel like a **fast command center for a recruiter**, not another large business system.
