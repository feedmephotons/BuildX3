"use client";

import { useState } from "react";

import { Modal } from "./Modal";

const highlights = [
  {
    title: "Pipeline",
    metric: "$4.2M",
    sub: "+12% vs last week",
    actions: ["Open Sales War Room", "Generate follow-ups"]
  },
  {
    title: "Schedule",
    metric: "18 jobs",
    sub: "3 weather risks, 1 permit block",
    actions: ["Optimize today", "View conflicts"]
  },
  {
    title: "Cash",
    metric: "$612K",
    sub: "AR over 30 days",
    actions: ["Collect fastest", "Offer payment plans"]
  }
];

export function ModeHighlights() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [showPaletteModal, setShowPaletteModal] = useState(false);

  return (
    <section className="card">
      <div className="flex items-center justify-between border-b border-shell-border px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Modes</p>
          <h2 className="text-lg font-semibold text-slate-900">Jump back into workspaces</h2>
        </div>
        <button
          className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
          onClick={() => setShowPaletteModal(true)}
        >
          Command Palette
        </button>
      </div>
      <div className="grid gap-4 p-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="space-y-3 rounded-2xl border border-shell-border bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <span className="chip">AI</span>
            </div>
            <div className="text-2xl font-semibold text-slate-900">{item.metric}</div>
            <p className="text-sm text-slate-600">{item.sub}</p>
            <div className="flex flex-wrap gap-2">
              {item.actions.map((action) => (
                <button
                  key={action}
                  onClick={() => setActiveAction(action)}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-accent-600 shadow-sm"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={showPaletteModal}
        onClose={() => setShowPaletteModal(false)}
        title="Command palette"
        description="Universal jump + action runner across all modes."
      >
        <p>Trigger with ⌘/Ctrl + K. Search, run automations, open views, and ask Gemini for next steps.</p>
        <p className="rounded-lg border border-shell-border bg-slate-50 p-3 text-sm text-slate-800">
          Example: &quot;Reassign weather-risk jobs&quot; → opens dispatch with AI suggestions and pre-filtered conflicts.
        </p>
      </Modal>

      <Modal
        open={Boolean(activeAction)}
        onClose={() => setActiveAction(null)}
        title={activeAction ?? ""}
        description="Preview of the workspace you just launched."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Open view</button>}
      >
        <ul className="space-y-2 text-sm text-slate-800">
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">AI highlights the right table or board.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Context-aware filters and saved views load automatically.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Copilot pins recommended actions to the right rail.</li>
        </ul>
      </Modal>
    </section>
  );
}
