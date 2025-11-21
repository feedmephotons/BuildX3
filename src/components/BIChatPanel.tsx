"use client";

import { useState } from "react";

import { Modal } from "./Modal";

const prompts = [
  "Profit by lead source last quarter",
  "Jobs at risk due to weather this week",
  "AR over 60d grouped by region",
  "Cycle time trend for reroofs"
];

const transcript = [
  {
    role: "user",
    text: "Show profitability by lead source for Q3 with conversion rates"
  },
  {
    role: "assistant",
    text: "Top drivers: Referrals $620k @ 44% margin | Door-to-door $410k @ 31% margin | Storm campaign $380k @ 28% margin."
  },
  {
    role: "assistant",
    text: "Biggest drag: Web inbound has slipped to 22% margin. Add financing CTA + new follow-up sequence to recover."
  }
];

export function BIChatPanel() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [fullAnalyticsOpen, setFullAnalyticsOpen] = useState(false);

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="card p-4 lg:col-span-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">BI chat</p>
        <p className="text-lg font-semibold text-slate-900">Ask AI about your business</p>
        <div className="mt-4 space-y-3">
          {transcript.map((entry, idx) => (
            <div key={idx} className="rounded-xl border border-shell-border bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">{entry.role}</p>
              <p className="text-sm text-slate-800">{entry.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-shell-border p-3 text-sm text-slate-600">
          <span className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Beta</span>
          <span>Ask anything about revenue, margin, pipeline, or crews.</span>
        </div>
      </div>

      <div className="card p-4 space-y-3">
        <p className="text-xs uppercase tracking-wide text-slate-500">Jumpstart prompts</p>
        {prompts.map((prompt) => (
          <div key={prompt} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
            <span className="text-sm text-slate-800">{prompt}</span>
            <button className="text-xs font-semibold text-accent-600" onClick={() => setSelectedPrompt(prompt)}>
              Ask
            </button>
          </div>
        ))}
        <button
          className="mt-2 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          onClick={() => setFullAnalyticsOpen(true)}
        >
          Open full analytics
        </button>
      </div>

      <Modal
        open={Boolean(selectedPrompt)}
        onClose={() => setSelectedPrompt(null)}
        title={selectedPrompt ?? ""}
        description="Gemini generates the chart and explanation automatically."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Send to Copilot</button>}
      >
        <p className="rounded-lg border border-shell-border bg-slate-50 p-3 text-sm text-slate-800">
          Visualization: bar chart with margin by source, plus variance vs last quarter. AI explains the key drivers and gives
          suggested actions.
        </p>
      </Modal>

      <Modal
        open={fullAnalyticsOpen}
        onClose={() => setFullAnalyticsOpen(false)}
        title="Analytics workspace"
        description="Switch to the full BI experience with saved looks, filters, and exports."
      >
        <ul className="space-y-2 text-sm text-slate-800">
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Executive dashboard with KPI tiles.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Ad-hoc BI chat with visualization library.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Exports to CSV, PDF, and scheduled email sends.</li>
        </ul>
      </Modal>
    </section>
  );
}
"use client";

import { useState } from "react";

import { Modal } from "./Modal";
