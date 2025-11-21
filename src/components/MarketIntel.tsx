"use client";

import { useState } from "react";

import { Modal } from "./Modal";

const alerts = [
  {
    title: "Storm window",
    detail: "Hail path near 77024 and 77057 — spin up canvassing + paid search",
    action: "Launch 3-hour blitz"
  },
  {
    title: "Permits lagging",
    detail: "Houston permits running 2.1d slower this month for reroofs",
    action: "Escalate jobs at risk"
  },
  {
    title: "Competitor moves",
    detail: "Sunrise Roofing recruiting crews in Katy. Keep top crews on priority hold.",
    action: "Ping subcontractor list"
  }
];

export function MarketIntel() {
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  return (
    <section className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Market intelligence</p>
          <p className="text-lg font-semibold text-slate-900">External signals</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">AI curated</span>
      </div>
      <div className="mt-4 space-y-3">
        {alerts.map((item) => (
          <div key={item.title} className="flex items-start justify-between rounded-xl border border-shell-border bg-slate-50 p-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="text-sm text-slate-700">{item.detail}</p>
            </div>
            <button className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white" onClick={() => setActiveAlert(item.title)}>
              {item.action}
            </button>
          </div>
        ))}
      </div>

      <Modal
        open={Boolean(activeAlert)}
        onClose={() => setActiveAlert(null)}
        title={activeAlert ?? ""}
        description="AI will propose a playbook, assign owners, and start tracking impact."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Start play</button>}
      >
        <ul className="space-y-2 text-sm text-slate-800">
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Auto-create tasks and outreach sequences.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Target zones, roles, and goals pre-filled.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Track conversions and margin lift in Analyze → Market.</li>
        </ul>
      </Modal>
    </section>
  );
}
"use client";

import { useState } from "react";

import { Modal } from "./Modal";
