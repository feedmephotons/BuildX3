"use client";

import { useState } from "react";

import { Modal } from "./Modal";

const priorities = [
  {
    label: "Now",
    tasks: [
      {
        title: "Call Lisa Gray about ridge vent upsell",
        tag: "Sales",
        value: "$28,400",
        badge: "AI next best action"
      },
      {
        title: "Approve permit for Job #1442",
        tag: "Build",
        value: "Due today",
        badge: "Blocking task"
      }
    ]
  },
  {
    label: "Today",
    tasks: [
      {
        title: "Send supplement draft for Johnson residence",
        tag: "Bill",
        value: "+$3,200",
        badge: "AI generated"
      },
      {
        title: "Reassign Valley Crew to Thursday window",
        tag: "Schedule",
        value: "Weather risk",
        badge: "Auto-detected"
      }
    ]
  }
];

export function MyWorkBoard() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [syncOpen, setSyncOpen] = useState(false);

  return (
    <section className="card">
      <div className="flex items-center justify-between border-b border-shell-border px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">My Work</p>
          <h2 className="text-lg font-semibold text-slate-900">AI-prioritized action queue</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" onClick={() => setFiltersOpen(true)}>
            Filters
          </button>
          <button className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white" onClick={() => setSyncOpen(true)}>
            Sync
          </button>
        </div>
      </div>
      <div className="grid gap-6 p-6 md:grid-cols-2">
        {priorities.map((group) => (
          <div key={group.label} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="badge-dot" />
                <p className="text-sm font-semibold text-slate-800">{group.label}</p>
              </div>
              <span className="text-xs uppercase tracking-wide text-slate-500">{group.tasks.length} items</span>
            </div>
            <div className="space-y-3">
              {group.tasks.map((task) => (
                <div key={task.title} className="rounded-xl border border-shell-border bg-slate-50 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{task.title}</p>
                      <p className="text-sm text-slate-600">{task.value}</p>
                    </div>
                    <span className="chip text-[11px] font-semibold text-accent-600">{task.badge}</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-slate-500">{task.tag}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="My Work filters"
        description="Tune the prioritization by lane, SLA, and persona focus."
      >
        <div className="space-y-2">
          <div className="rounded-lg border border-shell-border bg-slate-50 p-3 text-sm text-slate-800">Sales · Leads untouched &gt; 12h</div>
          <div className="rounded-lg border border-shell-border bg-slate-50 p-3 text-sm text-slate-800">Build · Jobs at risk or blocked</div>
          <div className="rounded-lg border border-shell-border bg-slate-50 p-3 text-sm text-slate-800">Bill · AR over 30 days</div>
        </div>
      </Modal>

      <Modal
        open={syncOpen}
        onClose={() => setSyncOpen(false)}
        title="Sync with Copilot"
        description="Confirm the items Copilot will push to the daily brief and notifications."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Confirm sync</button>}
      >
        <ul className="space-y-2 text-sm text-slate-800">
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Send top 5 actions via morning SMS + email.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Add overdue invoices to AR follow-up queue.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Pin weather risk jobs to dispatch view.</li>
        </ul>
      </Modal>
    </section>
  );
}
"use client";

import { useState } from "react";

import { Modal } from "./Modal";
