"use client";

import { useState } from "react";

import { Modal } from "./Modal";

const insights = [
  {
    title: "Do these first",
    description: "Call Lisa Gray (roof replacement) and approve permit for Job #1442.",
    impact: "+$38K in pipeline"
  },
  {
    title: "Risk detected",
    description: "Rain in 48h for Friday installs. Reshuffle crews to indoor jobs.",
    impact: "Avoid slip + delay risk"
  }
];

const drafts = [
  {
    label: "Follow-up email",
    body: "I updated your proposal with the ridge vent option we discussed."
  },
  {
    label: "Schedule note",
    body: "Move Valley Crew to Job 1442 on Thursday for weather window."
  }
];

export function CopilotPanel() {
  const [draftOpen, setDraftOpen] = useState<string | null>(null);

  return (
    <aside className="w-80 shrink-0 border-l border-shell-border bg-white px-4 py-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Copilot</p>
          <p className="text-lg font-semibold text-slate-900">Contextual AI</p>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Beta</span>
      </div>

      <div className="mt-6 space-y-4">
        {insights.map((item) => (
          <div key={item.title} className="card">
            <div className="flex items-center justify-between px-4 pt-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
              <span className="chip text-[11px] font-semibold text-accent-600">AI</span>
            </div>
            <div className="border-t border-shell-border px-4 py-3 text-xs font-semibold text-slate-700">
              {item.impact}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-xs uppercase tracking-wide text-slate-500">Ready-made drafts</p>
        <div className="mt-3 space-y-3">
          {drafts.map((draft) => (
            <div key={draft.label} className="card p-4">
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-900">
                <span>{draft.label}</span>
                <button className="text-xs font-semibold text-accent-600" onClick={() => setDraftOpen(draft.label)}>
                  Insert
                </button>
              </div>
              <p className="text-sm text-slate-700">{draft.body}</p>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={Boolean(draftOpen)}
        onClose={() => setDraftOpen(null)}
        title={draftOpen ?? ""}
        description="Drop this draft into email, SMS, or task comments."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Insert into composer</button>}
      >
        <p className="rounded-lg border border-shell-border bg-slate-50 p-3 text-sm text-slate-800">{drafts.find((d) => d.label === draftOpen)?.body}</p>
      </Modal>
    </aside>
  );
}
