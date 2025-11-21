"use client";

import { useEffect, useMemo, useState } from "react";

type Command = {
  category: string;
  label: string;
  hint: string;
  shortcut?: string;
};

const commands: Command[] = [
  { category: "Navigation", label: "Open Sales War Room", hint: "Sell → Pipeline", shortcut: "Enter" },
  { category: "Navigation", label: "Jump to Dispatch", hint: "Build → Schedule", shortcut: "D" },
  { category: "Navigation", label: "Go to AR aging", hint: "Bill → Collections", shortcut: "A" },
  { category: "Actions", label: "Create new lead", hint: "Sell", shortcut: "L" },
  { category: "Actions", label: "Optimize today", hint: "Build", shortcut: "O" },
  { category: "Actions", label: "Start supplement draft", hint: "Bill", shortcut: "S" },
  { category: "Analytics", label: "Show AR over 60 days", hint: "Analyze", shortcut: "R" },
  { category: "Analytics", label: "Margin by product", hint: "Analyze", shortcut: "M" },
  { category: "Automation", label: "Schedule follow-ups", hint: "Sell", shortcut: "F" },
  { category: "Automation", label: "Dispatch review requests", hint: "Digital", shortcut: "R" }
];

const suggestions = [
  "Looks like you want a BI question — open Analyze → BI chat",
  "Reassign jobs this week → Build → Dispatch",
  "Kick off overdue AR calls → Bill → Collections",
  "Run SEO scan for Katy storm microsite"
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return commands;
    return commands.filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-shell-border px-4 py-3">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI, run a command, or jump to a workspace"
            className="w-full bg-transparent text-sm text-slate-900 outline-none"
          />
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500">Esc</span>
        </div>

        <div className="grid max-h-[500px] grid-cols-3 divide-x divide-shell-border">
          <div className="col-span-2 overflow-auto">
            {filtered.map((cmd, idx) => (
              <div
                key={cmd.label}
                className={`flex items-center justify-between px-4 py-3 hover:bg-slate-50 ${idx === 0 ? "bg-slate-50" : ""}`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{cmd.label}</p>
                  <p className="text-xs text-slate-600">{cmd.hint}</p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                  <span className="rounded-md bg-slate-100 px-2 py-1">{cmd.category}</span>
                  {cmd.shortcut && <span className="rounded-md bg-slate-100 px-2 py-1">{cmd.shortcut}</span>}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="px-4 py-6 text-sm text-slate-600">No matches. Try another prompt or action.</div>
            )}
          </div>

          <div className="space-y-3 p-4">
            <div className="rounded-xl border border-shell-border bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Suggested</p>
              <div className="mt-2 space-y-2">
                {suggestions.map((item) => (
                  <p key={item} className="text-xs text-slate-700">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-shell-border p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Shortcuts</p>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
                <span className="rounded-md bg-slate-100 px-2 py-1">⌘/Ctrl + K</span>
                <span className="rounded-md bg-slate-100 px-2 py-1">Esc to close</span>
                <span className="rounded-md bg-slate-100 px-2 py-1">Tab to navigate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
