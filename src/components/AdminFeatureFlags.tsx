"use client";

import { useState } from "react";

const initialFlags = [
  { key: "supplements", label: "Insurance supplements", description: "Enable supplement workflows and AI letter drafts." },
  { key: "field-app", label: "Field app", description: "Mobile-first crew experience with offline capture." },
  { key: "automation", label: "Automation builder", description: "Visual workflow canvas for triggers and actions." },
  { key: "seo", label: "SEO dominator", description: "AI-driven content pipeline and ranking monitor." }
];

export function AdminFeatureFlags() {
  const [flags, setFlags] = useState<Record<string, boolean>>({
    supplements: true,
    "field-app": true,
    automation: false,
    seo: true
  });

  const toggleFlag = (key: string) => setFlags((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Feature access</p>
          <p className="text-lg font-semibold text-slate-900">Industry profile toggles</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">Auto-saved</span>
      </div>
      <div className="mt-4 space-y-3">
        {initialFlags.map((flag) => (
          <div key={flag.key} className="flex items-start justify-between rounded-xl border border-shell-border bg-slate-50 p-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">{flag.label}</p>
              <p className="text-sm text-slate-700">{flag.description}</p>
            </div>
            <button
              onClick={() => toggleFlag(flag.key)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                flags[flag.key]
                  ? "bg-slate-900 text-white"
                  : "border border-shell-border bg-white text-slate-700"
              }`}
            >
              {flags[flag.key] ? "Enabled" : "Disabled"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
