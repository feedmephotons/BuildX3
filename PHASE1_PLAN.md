# Phase 1 Delivery Blueprint

This document translates the vision for an AI-first operating system for the trades into a Phase 1 build plan with clear milestones, deliverables, and architecture notes. The focus is on shipping a usable foundation quickly while keeping the system modular for later phases.

## Guiding Principles
- **AI-native experience**: Copilot and intelligent defaults everywhere—no screens without contextual assistance.
- **Mode-first IA**: Navigation anchored in modes (Sell, Build, Bill, Analyze, Digital Presence, Admin) with persona-specific defaults.
- **Speed & responsiveness**: Optimistic UI, keyboard-first workflows (Cmd/Ctrl+K, / search), and persistent user preferences.
- **Composable architecture**: Next.js App Router + Supabase + Tailwind + shadcn/ui; isolate domains via feature folders and shared primitives.
- **Secure multi-tenancy**: Supabase Row Level Security (RLS) enforced from day one; org-aware queries on every data fetch.

## Milestone Overview
1. **App Shell & Navigation (Week 1–2)**
   - Left sidebar with workspace switcher, mode list, and persona quick links.
   - Top bar with command palette trigger, quick add, notifications stub, user menu.
   - Right-rail Copilot panel scaffold (context slots + action area).
   - Collapsible layout with responsive breakpoints.

2. **Supabase Foundation (Week 1–2, parallel)**
   - Schema: orgs, users, memberships/roles, personas, leads, contacts, jobs, tasks, proposals.
   - Auth with RLS templates per table; helper RPC for onboarding a new org.
   - Seed script for demo data (org + sample users + leads/jobs).

3. **Sell Basics (Week 3)**
   - Pipeline Kanban (dnd-kit) for stages: New → Contacted → Inspected → Proposed → Negotiation → Closed Won/Lost.
   - TanStack Table view with saved filters; AI badges placeholder (lead score, next action).
   - Contact dossier layout (profile, timeline feed, open work, quick composer).

4. **Build Basics (Week 4)**
   - Job record view: summary header, status, progress indicator, linked contact.
   - Lightweight scheduling strip (calendar/list hybrid) with drag/drop between crews/days.
   - Task checklist per job with assignees and due dates.

5. **My Work (Week 5)**
   - Unified action list grouped by time horizon (Now/Today/This Week/Later).
   - Quick filters by domain (Sales, Jobs, Money, Admin) and persona-aware defaults.
   - Copilot recommendations slot above the list.

6. **Command Palette & Copilot (Week 5–6)**
   - Cmd/Ctrl+K overlay with global entity search (leads, jobs, contacts) and view jumping.
   - Action intents: create lead/job/task; open scheduling; open AR.
   - Copilot panel hooked to current context (selected entity) with summarize/draft/respond actions using Gemini 3 Pro.

## Architecture & Implementation Notes
- **Project structure**: `/app/(mode)/...` for route groups; shared UI in `/components/ui`; domain modules in `/modules/{sell,build,bill,...}` with hooks, server actions, and types.
- **Data access**: Supabase client factory that injects org/user context; server actions wrap RLS-safe queries. Use Zod for payload validation.
- **State & caching**: React Query (or Next.js `use` for server components) for data fetching; optimistic updates for drag/drop and inline edits.
- **Theming**: Tailwind tokens + shadcn/ui; configurable theme provider to enable org branding later.
- **Telemetry**: Basic event logger for navigation, palette use, and Copilot invocations to inform prioritization.

## Acceptance Criteria by Milestone
- **App Shell**: Navigates between modes without full reload; keyboard shortcuts working; Copilot panel visible and resizable.
- **Supabase Foundation**: RLS policies validated via tests; seed command populates demo data; auth gates protect mode routes.
- **Sell Basics**: Kanban and table reflect the same dataset; drag/drop persists stage changes; contact dossier shows unified timeline stub.
- **Build Basics**: Scheduling strip supports drag/drop between crews; job view links to related contact and tasks; task completion syncs instantly.
- **My Work**: Aggregates items across leads, jobs, invoices (stub); grouping and filters persist per user; Copilot suggestions render.
- **Command Palette & Copilot**: Palette performs navigation and create actions; Copilot can summarize selected lead/job timeline and draft a reply.

## Dependencies & Risks
- **LLM integration**: Ensure graceful degradation when AI calls fail; cache context payloads to control token usage.
- **Realtime**: Supabase Realtime optional for Phase 1; start with optimistic updates and poll intervals.
- **Performance**: Avoid heavy client bundles—prefer server components for read-heavy views; lazy-load Copilot providers.
- **Security**: Strict RLS and input validation; audit logging for AI-generated actions.

## Next Steps
- Break each milestone into tickets (UI scaffolding, data models, API/server actions, AI integration, QA).
- Prioritize personas: Sales Rep and Production Manager for default experiences.
- Define initial AI prompt templates for summarize/draft/next-best-action flows.

## Detailed Scope & Ticket Starters
- **App Shell & Navigation**
  - Build layout primitives (Sidebar, Topbar, RightRail) with shadcn/ui + Tailwind tokens.
  - Implement mode switcher + persona quick links (config-driven JSON).
  - Add keyboard shortcuts: `Cmd/Ctrl+K` palette, `/` focus search, `?` help.
  - Responsiveness: collapse sidebar <1024px, hide right rail <1280px with toggle.

- **Supabase Foundation**
  - SQL migration 001: orgs, users (auth), memberships, personas, roles, features flags.
  - SQL migration 002: leads, contacts, addresses, jobs, tasks, proposals (MVP fields below).
  - RLS policies per table using `auth.uid()` + `org_id` scoping; helper `is_org_member(uid, org_id)` function.
  - Seed script: demo org, 2 personas (Sales Rep, Production Manager), 10 leads, 5 jobs, 20 tasks.

- **Sell Basics**
  - Kanban board component with drag handle + keyboard reorder; server action `updateLeadStage`.
  - Saved views: serialize filters to `lead_views` table (name, filters JSON, owner_user_id).
  - Contact dossier blocks: Profile card, timeline feed stub (interactions table to follow), open work summary, composer stub with AI button.

- **Build Basics**
  - Job header: status pill, progress (derived from task completion), linked contact & address, monetary stub.
  - Scheduling strip: list of crews (from `crews` table), drag/drop jobs per day; server action `scheduleJob(job_id, crew_id, date)`.
  - Tasks: inline checkbox updates with optimistic UI; `task_events` table for audit trail.

- **My Work**
  - Aggregated query combining tasks (open), leads needing touch (stage = Contacted > 48h), jobs at risk (status = Blocked), invoices stub.
  - Time-bucket logic (Now/Today/This Week/Later) computed server-side; persisted list preferences per user.
  - Copilot recommendations placeholder calling Gemini with compact context payload.

- **Command Palette & Copilot**
  - Palette providers: navigation (static list), search (Supabase RPC), quick actions (create lead/job/task), AI intent helper (LLM call-on-type optional).
  - Copilot panel slots: Summary, Suggested Actions, Draft Response; event bus to refresh on selection change.
  - Observability: log palette invocations + Copilot actions to `events` table with `event_type`, `payload`, `user_id`.

## Supabase Schema (Phase 1 MVP Fields)
- `orgs (id, name, slug, created_at)`
- `users (handled by Supabase auth)`
- `memberships (id, org_id, user_id, role, persona, created_at)`
- `feature_flags (id, org_id, key, enabled, created_at)`
- `contacts (id, org_id, full_name, email, phone, address, city, state, zip, tags text[], created_at, updated_at)`
- `leads (id, org_id, contact_id, stage, value_estimate numeric, source, probability int, assigned_to, next_action_at, notes, created_at, updated_at)`
- `jobs (id, org_id, contact_id, title, status, start_date, end_date, crew_id, progress int default 0, risk text, created_at, updated_at)`
- `crews (id, org_id, name, trade, color, created_at)`
- `tasks (id, org_id, job_id, lead_id, title, status, due_date, assignee_id, priority, created_at, updated_at)`
- `proposals (id, org_id, lead_id, version int, total numeric, status, signed_at, created_at, updated_at)`
- `lead_views (id, org_id, name, filters jsonb, owner_user_id, created_at)`
- `events (id, org_id, user_id, event_type, payload jsonb, created_at)`

## API & Server Action Contracts (Examples)
- `createLead(payload)` → validates with Zod, inserts `contact` if needed, returns hydrated lead.
- `updateLeadStage(lead_id, stage)` → checks membership via RLS; emits `events` entry.
- `createTask({job_id?, lead_id?, title, due_date, assignee_id})` → returns task; triggers optimistic update.
- `scheduleJob(job_id, crew_id, start_date)` → writes to `jobs` and upserts `events` entry; rejects if org mismatch.
- `getMyWork(user_id)` → aggregates open tasks, risky leads, blocked jobs with pagination.
- `copilotSummarize(entity_type, entity_id)` → assembles context (timeline stub, metadata) and calls Gemini; caches response in `events` for reuse.

## UI Component Inventory (Phase 1)
- **Layout**: `Sidebar`, `Topbar`, `RightRail`, `AppPage` shell, `ModeSwitcher`, `PersonaLinks`.
- **Navigation**: `MegaMenu` stub per mode, `Breadcrumbs`, `CommandPalette` (Radix Dialog + Combobox).
- **Data Display**: `KanbanBoard`, `StageColumn`, `LeadCard`, `DataTable` (TanStack), `ProgressPill`, `StatusBadge`.
- **Forms/Inputs**: `QuickAddDrawer`, `TaskInlineEditor`, `AssignDropdown`, `DateBadge`, `FilterChips`.
- **Copilot**: `CopilotPanel`, `CopilotActionBar`, `AIIndicator`, `SuggestionList`.
- **Feedback**: `Toast`, `Banner`, `EmptyState` with CTA to create via AI.

## AI Interaction Map (Phase 1)
- **Copilot Panel**
  - Context sources: selected lead/job/contact, My Work selection, Kanban column focus.
  - Actions: Summarize timeline, Draft follow-up (email/SMS), Recommend next action, Explain stage changes.
  - Rate limits: debounce requests; max 1 active call per panel; graceful fallback with cached summary.

- **Command Palette AI Assist**
  - Intent detection prompt: short system message with allowed actions + example mappings.
  - If AI intent confidence low, default to search; never block basic navigation.

- **Data Quality Guardrails**
  - Log AI-generated text with source + prompt; flag items >N tokens for manual review (future moderation hook).

## Observability, Performance, and Testing
- **Performance Budgets**
  - LCP < 2.5s on primary dashboard; initial JS < 200kb where possible using server components.
  - Kanban column virtualization for >50 cards; lazy-load charts and Copilot provider.

- **Telemetry**
  - Event schema above; capture palette usage, Copilot actions, drag/drop moves, and My Work dismissals.

- **Testing Strategy**
  - Unit: Zod validators, server actions (Supabase client mocked), RLS policy tests via pgTAP or SQL test harness.
  - Integration: Playwright smoke for navigation, palette open/execute, drag/drop Kanban, task completion sync.
  - AI contract tests: golden prompts with stubbed Gemini responses to guard regressions.
  - Migration checks: run `supabase db diff` and `supabase db reset --use-migrations` in CI.

## Delivery Cadence & Demos
- Weekly increments aligned to milestones; end-of-week demo showing working shell + domain slice.
- Demo order recommendation: (1) Shell + Supabase auth, (2) Pipeline + Kanban persistence, (3) My Work aggregation, (4) Copilot summarize + palette actions.

## Directory Scaffolding (Target State Before Coding)
- `app/(marketing)/*`: temporary landing/placeholder + auth redirect stubs.
- `app/(app)/layout.tsx`: wraps all app routes with shell (Sidebar, Topbar, RightRail providers).
- `app/(app)/(sell)/pipeline/page.tsx`: Kanban + table toggle; server components fetch initial data.
- `app/(app)/(sell)/contacts/[id]/page.tsx`: Dossier layout with three-column grid and Copilot slot.
- `app/(app)/(build)/jobs/[id]/page.tsx`: Job “Digital Jacket” summary + tasks list + scheduling strip preview.
- `app/(app)/my-work/page.tsx`: Aggregated action list; server action-backed data fetch.
- `modules/{sell,build,bill}/`: domain hooks, server actions, types, and constants.
- `components/ui/`: shadcn-generated primitives + shared design tokens.
- `components/app-shell/`: Sidebar, Topbar, RightRail, CommandPalette, MegaMenu, PersonaLinks, CopilotPanel.
- `lib/`: `supabaseClient`, `auth`, `orgContext`, `telemetry`, `keyboard` helpers.
- `scripts/`: `seed.ts` for demo org + `supabase` CLI helpers.

## Migration Drafts (Ready to Port into Supabase Migrations)
```sql
-- 001_core.sql
create table if not exists orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

create table if not exists memberships (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  user_id uuid not null,
  role text check (role in ('owner','admin','member')) not null,
  persona text check (persona in ('owner','sales','production','ar','field')),
  created_at timestamptz default now()
);

create table if not exists feature_flags (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  key text not null,
  enabled boolean default false,
  created_at timestamptz default now()
);

create or replace function is_org_member(uid uuid, org uuid)
returns boolean as $$
  select exists(
    select 1 from memberships m
    where m.user_id = uid and m.org_id = org
  );
$$ language sql stable;

-- Basic RLS template
alter table orgs enable row level security;
alter table memberships enable row level security;
alter table feature_flags enable row level security;

create policy orgs_select on orgs
  for select using (is_org_member(auth.uid(), id));

create policy memberships_select on memberships
  for select using (is_org_member(auth.uid(), org_id));

-- 002_crm_ops.sql (key domain tables)
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  address text,
  city text,
  state text,
  zip text,
  tags text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  contact_id uuid references contacts(id) on delete cascade,
  stage text check (stage in ('new','contacted','inspected','proposed','negotiation','closed_won','closed_lost')),
  value_estimate numeric,
  source text,
  probability int,
  assigned_to uuid,
  next_action_at timestamptz,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists crews (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  name text not null,
  trade text,
  color text,
  created_at timestamptz default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  contact_id uuid references contacts(id) on delete cascade,
  title text not null,
  status text check (status in ('planning','scheduled','in_progress','blocked','complete')),
  start_date date,
  end_date date,
  crew_id uuid references crews(id),
  progress int default 0,
  risk text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  job_id uuid references jobs(id) on delete cascade,
  lead_id uuid references leads(id) on delete cascade,
  title text not null,
  status text check (status in ('todo','in_progress','done')) default 'todo',
  due_date date,
  assignee_id uuid,
  priority text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists proposals (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  lead_id uuid references leads(id) on delete cascade,
  version int default 1,
  total numeric,
  status text,
  signed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists lead_views (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  name text not null,
  filters jsonb,
  owner_user_id uuid,
  created_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id) on delete cascade,
  user_id uuid,
  event_type text,
  payload jsonb,
  created_at timestamptz default now()
);
```

### Seed Script Blueprint (`scripts/seed.ts`)
- **Inputs**: optional `ORG_NAME`, `ORG_SLUG` env vars; default seeded personas (Sales Rep, Production Manager).
- **Flow**:
  1. Create org and memberships for 3 demo users.
  2. Insert 10 contacts + leads with varied stages and probabilities.
  3. Insert 5 jobs mapped to contacts, plus 3 crews for scheduling tests.
  4. Insert 20 tasks tied to jobs/leads, balanced across statuses/due dates.
  5. Insert 3 saved `lead_views` representing useful filters (e.g., "Uncontacted > 24h").

## Server Action & API Payload Shapes (Concrete Drafts)
- `createLead(input)`
  - Payload: `{ orgId, contact: { fullName, email?, phone? }, stage = 'new', valueEstimate?, source?, assignedTo?, nextActionAt? }`
  - Steps: validate → upsert contact → insert lead → log `events` → return `{ lead, contact }`.
- `updateLeadStage({ leadId, stage })`
  - Payload: `{ leadId: uuid, stage: LeadStage }`; rejects if stage invalid for persona role.
  - Side effects: update `leads.stage`, `leads.updated_at`, log `events`, broadcast Realtime channel `lead:{orgId}`.
- `scheduleJob({ jobId, crewId, date })`
  - Payload: `{ jobId: uuid, crewId: uuid, date: date }`; checks crew/org alignment.
  - Side effects: update `jobs.start_date` (and `end_date` if single-day), log `events`, emit telemetry `schedule.updated`.
- `getMyWork({ userId, orgId })`
  - Returns grouped buckets: `{ now: Item[], today: Item[], week: Item[], later: Item[] }` with item shape `{ type, title, url, dueDate?, badge? }`.
- `copilotSummarize({ entityType, entityId })`
  - Assembles context (entity core fields + last 10 timeline items), calls Gemini stub, caches summary in `events` keyed by entity.

## UI Flow Notes (Ready-to-Build Checklists)
- **Pipeline Board**
  - Columns defined via `LeadStage[]`; drag/drop triggers optimistic update + server action; keyboard reorder with arrows/enter.
  - Inline lead card actions: open dossier, mark next action done, quick assign, open Copilot summary.
- **Contact Dossier**
  - 3-column grid: Profile (contact + related stats), Timeline (interactions stub), Context (open leads/jobs/tasks), Composer with AI draft button.
  - Copilot sidecar mirrors selection to keep context in sync; show AI indicator on AI-authored notes.
- **Job Jacket + Scheduling Strip**
  - Header with status pill + progress bar; tasks list with inline completion; scheduling strip showing crew lanes by day.
  - Dragging a job updates `jobs.crew_id` and `start_date`; blocked jobs show risk badge and Copilot suggestion.
- **My Work**
  - Server component for initial grouped lists; client hydration for quick filters and dismissal; Copilot recommendations above list.
  - Keyboard: `1/2/3/4` to jump to Now/Today/This Week/Later; `/` search within list.
- **Command Palette**
  - Radix dialog + combobox; providers (navigation, search, actions, AI intent) registered via context; fallback to navigation on API latency.
  - Accepts command categories (Go to, Create, Search, AI) and renders badges; shows recent actions.

## QA Checklists (Per Milestone)
- **Shell**: Keyboard shortcuts open palette/help; sidebar collapses <1024px; Copilot toggle persists; telemetry events recorded.
- **Supabase**: `supabase db reset --use-migrations` succeeds; RLS tests confirm cross-org isolation; seed script runs without manual steps.
- **Sell**: Drag/drop updates persist after reload; saved views restore filters/columns; dossier loads linked jobs/tasks without n+1 queries.
- **Build**: Scheduling drag/drop enforces crew ownership; tasks sync optimistically and reconcile with server; progress derived from task stats matches DB.
- **My Work**: Buckets reflect correct time logic; dismissing an item logs event; Copilot call completes under timeout with fallback text.
- **Command Palette & Copilot**: Palette executes navigation/action commands; AI intent suggestions never block; Copilot summary cached per entity and invalidates on new timeline entry.

## RLS Policy Starters (Copy/Paste Ready)
- **Shared template**: `using (org_id = current_setting('app.current_org')::uuid)` set via middleware; fallback to `is_org_member(auth.uid(), org_id)` if setting unavailable.
- Contacts/leads/jobs/tasks/proposals/crews/lead_views/events:
  - `select`: match `org_id` AND `is_org_member(auth.uid(), org_id)`.
  - `insert/update/delete`: require membership; `auth.uid() = user_id` check for events, optional assignee checks on tasks.
- Example (contacts):
  ```sql
  alter table contacts enable row level security;
  create policy contacts_select on contacts
    for select using (is_org_member(auth.uid(), org_id));
  create policy contacts_mod on contacts
    for all using (is_org_member(auth.uid(), org_id));
  ```
- Example (tasks with assignee guard):
  ```sql
  alter table tasks enable row level security;
  create policy tasks_select on tasks
    for select using (is_org_member(auth.uid(), org_id));
  create policy tasks_mod on tasks
    for all using (
      is_org_member(auth.uid(), org_id)
      and (
        auth.uid() = assignee_id
        or exists(
          select 1 from memberships m
          where m.user_id = auth.uid()
          and m.org_id = tasks.org_id
          and m.role in ('owner','admin')
        )
      )
    );
  ```

## Supabase RPC Helpers (Implement Early)
- `set_current_org(org_slug text)` → sets `app.current_org` for the session and validates membership; simplifies RLS checks.
- `get_my_work(user uuid, org uuid)` → server-side aggregation used by `getMyWork` action to keep logic in SQL.
- `recent_timeline(entity_id uuid, entity_type text, limit int)` → unified feed for dossier and Copilot context.
- `upsert_lead_view(payload jsonb)` → saves/updates views and enforces org ownership.
- `log_event(event_type text, payload jsonb)` → inserts into `events` with org/user derived from settings; used by actions.

## Seed Data Examples (Ready for `scripts/seed.ts`)
- **Personas & Users**: Owner (`owner@demo.test`), Sales Rep (`sales@demo.test`), Production Manager (`prod@demo.test`).
- **Leads**: 10 records spanning stages with value bands (5–75k), sources (Door-to-door, Referral, Storm), probabilities (20–80%).
- **Jobs**: 5 jobs covering statuses (planning, scheduled, in_progress, blocked, complete) with linked crews/colors.
- **Tasks**: Mix due today/this week/later; at least one blocked task per job for My Work coverage.
- **Lead Views**: `"Uncontacted 24h"`, `"High value >50k"`, `"Storm region 770xx"`.
- **Proposals**: 3 drafts, 1 sent, 1 signed to validate versioning and status badges.

## Implementation Runbook (Day 1–14 Checklist)
1. **Setup**: Initialize Next.js App Router + Tailwind + shadcn; create `components/ui` baseline; wire Supabase client with server-side helpers.
2. **Auth & Org Context**: Add middleware to resolve org from subdomain/slug; set `app.current_org`; gate routes with `middleware.ts`.
3. **Migrations**: Apply 001 + 002 drafts; add RLS policies above; create RPC helpers; run `supabase db reset --use-migrations` to verify.
4. **Seed**: Implement `scripts/seed.ts` using Supabase client; load demo org/users/leads/jobs/tasks/views/proposals/crews.
5. **Shell**: Build `app/(app)/layout.tsx` with Sidebar/Topbar/RightRail; wire keyboard shortcuts and telemetry events.
6. **Sell/Build Pages**: Implement pipeline page (Kanban + table toggle) and job jacket + scheduling strip with optimistic drag/drop.
7. **My Work**: Build server component fetching SQL RPC; client filters + keyboard shortcuts; Copilot placeholder call.
8. **Command Palette & Copilot**: Register providers, wire search/create/navigation, connect Copilot summary/draft actions with Gemini stub.
9. **QA**: Run Playwright smoke (nav, palette, drag/drop, task toggle), unit tests for validators/actions, and RLS pgTAP suite.

## Testing Commands (Include in README Later)
- Local migrations reset: `supabase db reset --use-migrations`
- Seed demo data: `pnpm tsx scripts/seed.ts`
- Unit tests (actions + validators): `pnpm test`
- E2E smoke: `pnpm playwright test --project=chromium --grep @smoke`
- Lint/typecheck: `pnpm lint && pnpm typecheck`

## Prompt Templates (Phase 1 Drafts)
- **Copilot Summaries (Lead/Job/Contact)**
  - System: "You are the AI copilot for a trades OS. Summarize the entity for a human operator in 5 bullet points: status, risks, next steps, blockers, money. Be concise and action-oriented."
  - Input: entity core fields + last 10 timeline entries + open tasks.
  - Output: markdown bullets with **bold** labels and short calls-to-action.
- **Draft Follow-up (Email/SMS)**
  - System: "Write a concise, helpful follow-up for a homeowner. Keep to 3–5 sentences, include scheduling link placeholder, and surface a single clear ask."
  - Input: persona (sales/production/ar), contact tone, last interaction summary, desired outcome.
  - Output: plain text + optional subject line; never include pricing.
- **Palette Intent Detection**
  - System: "Map the user query to one of: {navigate, search, create_lead, create_job, create_task, open_schedule, open_ar}. Respond with JSON `{intent, reason}`."
  - Input: raw query string + optional current mode.
  - Output: small JSON; default to `navigate` when uncertain.

## Persona Defaults & Navigation Config (JSON-ready)
```json
{
  "owner": {
    "home": "/analyze",
    "pinnedModes": ["analyze", "bill", "digital"],
    "quickLinks": ["/my-work", "/analyze/exec", "/bill/ar"]
  },
  "sales": {
    "home": "/sell/pipeline",
    "pinnedModes": ["sell", "build"],
    "quickLinks": ["/my-work", "/sell/contacts", "/sell/pipeline?view=kanban"]
  },
  "production": {
    "home": "/build/jobs",
    "pinnedModes": ["build", "bill"],
    "quickLinks": ["/my-work", "/build/schedule", "/build/jobs?lens=at-risk"]
  },
  "ar": {
    "home": "/bill/ar",
    "pinnedModes": ["bill", "analyze"],
    "quickLinks": ["/my-work", "/bill/ar?view=aging", "/bill/job-costing"]
  }
}
```

## Feature Flags to Wire Early
- `digital_presence`: hides/opens the Digital Presence mode and menu.
- `supplements`: toggles Insurance Supplement UI stubs.
- `field_app`: toggles PWA entry and mobile-optimized layout switch.
- `ai_intents`: enables LLM-backed intent detection in palette (fallback to basic navigation when off).
- `realtime_sync`: enables Supabase Realtime channels for pipeline/scheduling updates.

## Observability Event Schema (Concrete Examples)
- `palette.invoked` `{ source: 'keyboard' | 'button', mode }`
- `palette.execute` `{ command: 'navigate' | 'create_lead' | 'search' | 'ai_intent', payload }`
- `copilot.summary.request` `{ entityType, entityId, tokens_estimate }`
- `copilot.summary.success` `{ entityType, entityId, latency_ms, tokens_used }`
- `copilot.summary.fail` `{ entityType, entityId, error }`
- `kanban.move` `{ leadId, fromStage, toStage, optimistic: true/false }`
- `schedule.update` `{ jobId, crewId, date }`
- `mywork.dismiss` `{ itemId, bucket }`

## Edge Cases & Fallbacks
- **Org context missing**: redirect to org selection, clear `app.current_org` setting, and block writes.
- **RLS violations**: surface toast with support code; log `events` with `rls_denied` for audit.
- **AI failure**: show cached summary if present; otherwise render plain text "AI unavailable" with retry.
- **Drag/drop conflicts**: if server rejects stage/schedule change, revert UI and show inline banner with reason.
- **Offline/poor network**: keep palette and My Work searchable from cached data; queue writes for retry when possible.

## Deployment & Environments (Phase 1)
- **Envs**: `dev` (local Supabase), `staging` (Supabase project + Vercel preview), `prod` (locked migrations).
- **Secrets**: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`; use Vercel env groups.
- **Migrations**: gated behind PR CI; require `supabase db reset --use-migrations` pass before merge.
- **Release**: ship weekly to staging with demo data reset; promote to prod after smoke + RLS tests.

## Demo Script (First Two Demos)
1. **Shell + Pipeline** (Week 2)
   - Login → auto-redirect to persona home.
   - Show sidebar collapse, palette open, navigate to Sell → Pipeline.
   - Drag lead across stages (optimistic), open dossier, trigger Copilot summary.
2. **My Work + Copilot Draft** (Week 3)
   - Open My Work, filter to Sales/Jobs, show buckets.
   - Trigger Copilot recommendation, then draft follow-up SMS from an item.
   - Use palette to create a task and see list refresh.

## Acceptance Tests (Executable Outline)
- **RLS Guard**: attempts to fetch another org’s lead returns 0 rows under pgTAP.
- **Kanban Persistence**: Playwright moves card; DB stage matches after reload.
- **Scheduling**: Drag job to new crew; DB row updates; unauthorized crew rejected.
- **My Work Buckets**: Items grouped by time boundaries; due-today items move buckets after midnight rollover.
- **Copilot Caching**: Second summary call uses cached `events` record and returns within <500ms.
- **Palette Intent**: Typing "new lead" triggers `create_lead` intent when `ai_intents` flag on; falls back to search when off.

## Code Quality & DX Defaults
- **Linting**: ESLint with Next + Tailwind plugins; enforce import sorting and no default exports in domain modules.
- **Types**: Enable `strict` in `tsconfig`; use `zod` schemas co-located with server actions; derive `Infer<typeof schema>` types.
- **Styling**: Tailwind class regex lint; prefer `cn` helper; never inline arbitrary hex colors (use theme tokens).
- **Testing Harness**: Vitest + React Testing Library for components; Playwright for E2E; pgTAP for SQL policies.
- **Git Hooks**: `lint-staged` to run `pnpm lint:typecheck:test --filter changed` before commit; commitlint with conventional commits.

## Ready-to-Implement Task Templates (Jira-ready)
- **Story**: "As a Sales Rep, I can move leads across pipeline stages with immediate feedback"
  - Tasks: build Kanban UI; wire drag/drop optimistic update; server action with RLS; Playwright test; telemetry event.
- **Story**: "As a Production Manager, I can drag jobs between crews on a schedule strip"
  - Tasks: crew lanes UI; schedule mutation; conflict banner; event logging; schema migration for crew colors.
- **Story**: "As a user, I can open the command palette to navigate or create core records"
  - Tasks: palette shell; providers for navigation/search/actions; AI intent toggle; shortcut handling; smoke test.
- **Story**: "As any persona, My Work shows my prioritized tasks"
  - Tasks: SQL RPC for aggregation; server component list; filters + keyboard shortcuts; Copilot recommendations; telemetry + tests.

## Documentation To-Do
- Add README sections for: environment setup, Supabase CLI usage, testing commands, AI key configuration, demo login creds.
- Create ADRs for: layout approach (RSC vs client), data access pattern (server actions + Supabase), AI caching strategy.
- Add CONTRIBUTING.md with coding standards, PR checklist, and release process.
