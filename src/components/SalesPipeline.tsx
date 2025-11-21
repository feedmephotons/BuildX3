"use client";

import { useState } from "react";

import { Modal } from "./Modal";

const stages = [
  {
    title: "New",
    leads: [
      { name: "Brett Carver", value: "$14,400", note: "Storm lead", score: 58 },
      { name: "Cedar Lane HOA", value: "$188,000", note: "Multi-building", score: 62 }
    ]
  },
  {
    title: "Proposed",
    leads: [
      { name: "Lisa Gray", value: "$28,400", note: "Ridge vent upsell", score: 86 },
      { name: "Marco Silva", value: "$18,700", note: "Financing asked", score: 71 }
    ]
  },
  {
    title: "Negotiation",
    leads: [
      { name: "Oakwood HOA", value: "$122,400", note: "Board vote Fri", score: 63 }
    ]
  }
];

export function SalesPipeline() {
  const [boardOpen, setBoardOpen] = useState(false);

  return (
    <section className="card">
      <div className="flex items-center justify-between border-b border-shell-border px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Sell</p>
          <h2 className="text-lg font-semibold text-slate-900">Pipeline overview</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="chip">AI scores</span>
          <button className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white" onClick={() => setBoardOpen(true)}>
            View board
          </button>
        </div>
      </div>
      <div className="grid gap-4 p-6 md:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage.title} className="space-y-3 rounded-2xl border border-shell-border bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{stage.title}</p>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-600">
                {stage.leads.length} leads
              </span>
            </div>
            <div className="space-y-3">
              {stage.leads.map((lead) => (
                <div key={lead.name} className="rounded-xl border border-shell-border bg-white p-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{lead.name}</p>
                      <p className="text-xs text-slate-600">{lead.note}</p>
                    </div>
                    <div className="text-right text-sm font-semibold text-slate-900">{lead.value}</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Score</span>
                    <span className="text-accent-600">{lead.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={boardOpen}
        onClose={() => setBoardOpen(false)}
        title="Pipeline board"
        description="Kanban with drag/drop, AI scoring, and quick actions."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Open full board</button>}
      >
        <p className="rounded-lg border border-shell-border bg-slate-50 p-3 text-sm text-slate-800">
          Move leads across stages, trigger automations, and see AI next best actions inline.
        </p>
      </Modal>
    </section>
  );
}
