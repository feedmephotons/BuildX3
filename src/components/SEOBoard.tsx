"use client";

import { useState } from "react";

import { Modal } from "./Modal";

const columns = [
  {
    title: "Ideas",
    items: ["Gutters + roofing bundle", "Financing FAQ", "Ventilation checklist"]
  },
  {
    title: "Drafting",
    items: ["Katy hail landing page", "Solar shingles explainer"]
  },
  {
    title: "Scheduled",
    items: ["Storm 101 webinar recap"]
  },
  {
    title: "Published",
    items: ["2024 roof color trends", "Insurance supplement guide"]
  }
];

export function SEOBoard() {
  const [ideaOpen, setIdeaOpen] = useState(false);

  return (
    <section className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">SEO dominator</p>
          <p className="text-lg font-semibold text-slate-900">Content pipeline</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white" onClick={() => setIdeaOpen(true)}>
          Generate idea
        </button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title} className="rounded-2xl border border-shell-border bg-slate-50 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{col.title}</p>
              <span className="text-xs font-semibold text-slate-500">{col.items.length}</span>
            </div>
            <div className="mt-2 space-y-2">
              {col.items.map((item) => (
                <div key={item} className="rounded-xl bg-white p-3 text-sm font-medium text-slate-800 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={ideaOpen}
        onClose={() => setIdeaOpen(false)}
        title="Generate SEO idea"
        description="AI recommends topics, outlines, and keywords tailored to your service areas."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Save to board</button>}
      >
        <ul className="space-y-2 text-sm text-slate-800">
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Keyword: "roof leak after hail" · Volume 9.8k · Difficulty 28</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Outline with CTAs, FAQs, and schema suggestions.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Auto-create draft in Drafting column.</li>
        </ul>
      </Modal>
    </section>
  );
}
"use client";

import { useState } from "react";

import { Modal } from "./Modal";
