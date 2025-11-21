"use client";

import { useState } from "react";

import { Modal } from "./Modal";

const siteStats = [
  { label: "Core Web Vitals", value: "96", hint: "LCP 1.9s, CLS 0.03" },
  { label: "Conversion", value: "5.2%", hint: "+0.7pp vs last week" },
  { label: "Leads", value: "184", hint: "+22% MoM" }
];

const nextActions = [
  "Publish Katy storm landing page with AI copy",
  "Swap hero image to lighter asset for CLS improvement",
  "Activate review widget on pricing page"
];

export function WebsiteManager() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);

  return (
    <section className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Website manager</p>
          <p className="text-lg font-semibold text-slate-900">Site health & CRO</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white" onClick={() => setEditorOpen(true)}>
          Open editor
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {siteStats.map((item) => (
          <div key={item.label} className="rounded-xl border border-shell-border bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{item.value}</p>
            <p className="text-sm text-slate-700">{item.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">Next actions</p>
        <div className="mt-2 space-y-2">
          {nextActions.map((task) => (
            <div key={task} className="flex items-center justify-between rounded-xl border border-dashed border-shell-border p-3">
              <p className="text-sm text-slate-800">{task}</p>
              <button className="text-xs font-semibold text-accent-600" onClick={() => setActiveAction(task)}>
                Run
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        title="Website editor"
        description="AI-assisted editing for landing pages, reviews, and CTAs."
      >
        <p className="rounded-lg border border-shell-border bg-slate-50 p-3 text-sm text-slate-800">
          Drag blocks, regenerate copy, and publish to your subdomain with rollback versions.
        </p>
      </Modal>

      <Modal
        open={Boolean(activeAction)}
        onClose={() => setActiveAction(null)}
        title={activeAction ?? ""}
        description="Copilot will run this change and monitor the impact."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Execute</button>}
      >
        <ul className="space-y-2 text-sm text-slate-800">
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Auto-generate content + assets.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Set split test guardrails and rollback triggers.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Push results to Analyze → Digital dashboards.</li>
        </ul>
      </Modal>
    </section>
  );
}
