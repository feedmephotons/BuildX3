"use client";

import { useState } from "react";

import { Modal } from "./Modal";

const touchpoints = [
  { type: "Call", actor: "Elena", detail: "Discussed insurance path; homeowner prefers ACH", time: "Today 9:12a" },
  { type: "Note", actor: "AI", detail: "High intent. Wants install before school year.", time: "Yesterday" },
  { type: "Email", actor: "Elena", detail: "Shared proposal with financing options", time: "Tue" }
];

export function LeadDossier() {
  const [timelineModal, setTimelineModal] = useState(false);

  return (
    <section className="card">
      <div className="grid border-b border-shell-border md:grid-cols-3">
        <div className="space-y-2 border-r border-shell-border p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">Profile</p>
          <h3 className="text-lg font-semibold text-slate-900">Lisa Gray</h3>
          <p className="text-sm text-slate-600">123 Maple St, Ridgeview</p>
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-600">
            <span className="badge-dot" /> Relationship health: 82
          </div>
          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
            Prefers text. Has dog. Wants ridge vent + black gutters. Considering 18mo financing.
          </div>
        </div>

        <div className="space-y-3 border-r border-shell-border p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide text-slate-500">Timeline</p>
            <button className="text-xs font-semibold text-accent-600" onClick={() => setTimelineModal(true)}>
              Gemini summary
            </button>
          </div>
          <div className="space-y-3">
            {touchpoints.map((item) => (
              <div key={item.detail} className="rounded-xl border border-shell-border bg-slate-50 p-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>{item.type}</span>
                  <span>{item.time}</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-900">{item.detail}</p>
                <p className="text-xs text-slate-500">by {item.actor}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">Context</p>
          <div className="mt-3 space-y-3">
            <div className="rounded-xl border border-shell-border bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">Open opportunity</p>
              <p className="text-xs text-slate-600">Roof replacement · $28,400 · Proposed</p>
            </div>
            <div className="rounded-xl border border-shell-border bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">Schedule</p>
              <p className="text-xs text-slate-600">Inspection Thu 3p with Valley Crew</p>
            </div>
            <div className="rounded-xl border border-shell-border bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">Communication</p>
              <p className="text-xs text-slate-600">Email + SMS sync on. Auto-draft follow-ups ready.</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={timelineModal}
        onClose={() => setTimelineModal(false)}
        title="AI summary of timeline"
        description="Gemini condenses calls, emails, notes, and tasks into a quick brief."
      >
        <p>
          Lisa is ready to move before the school year. Insurance path accepted; financing option open. Prefers text updates and
          wants ridge vent + black gutters. Inspection set for Thu 3p with Valley Crew. Next best action: send financing matrix
          and confirm install window.
        </p>
      </Modal>
    </section>
  );
}
