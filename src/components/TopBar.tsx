"use client";

import { useState } from "react";

import { Modal } from "./Modal";
import { Search } from "./icons/Search";

export function TopBar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [quickAddModal, setQuickAddModal] = useState(false);
  const [alertsModal, setAlertsModal] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-shell-border bg-white px-6 py-4">
      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={onOpenPalette}
          className="flex w-full max-w-xl items-center gap-3 rounded-xl border border-shell-border bg-slate-50 px-3 py-2 text-sm text-slate-600 shadow-sm"
        >
          <Search className="h-4 w-4 text-slate-500" />
          <span className="w-full text-left text-slate-600">
            Search or command: leads, jobs, contacts, invoices, docs
          </span>
          <span className="rounded-md bg-white px-2 py-1 text-[11px] font-semibold text-slate-500 shadow">⌘K</span>
        </button>
        <button
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-card hover:bg-slate-800"
          onClick={() => setQuickAddModal(true)}
        >
          + Quick Add
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setAlertsModal(true)}
          className="relative rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700"
        >
          5 alerts
          <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-accent-500" />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-card">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-center text-sm font-bold text-white">
            EA
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Elena Adams</p>
            <p className="text-xs text-slate-500">Owner</p>
          </div>
        </div>
      </div>

      <Modal
        open={quickAddModal}
        onClose={() => setQuickAddModal(false)}
        title="Quick add"
        description="Create a lead, task, or note in seconds without leaving the shell."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Create item</button>}
      >
        <div className="space-y-3">
          <div className="rounded-lg border border-shell-border bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Lead</p>
            <p className="text-sm font-semibold text-slate-900">Insurance homeowner</p>
            <p className="text-xs text-slate-600">Name, address, source, probability score, and next touch.</p>
          </div>
          <div className="rounded-lg border border-shell-border bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Task</p>
            <p className="text-sm font-semibold text-slate-900">Send financing matrix</p>
            <p className="text-xs text-slate-600">Assign to sales with due date and reminders.</p>
          </div>
        </div>
      </Modal>

      <Modal
        open={alertsModal}
        onClose={() => setAlertsModal(false)}
        title="Realtime alerts"
        description="Notifications across pipeline, schedule, and money lanes."
      >
        <ul className="space-y-2 text-sm text-slate-800">
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">3 leads have gone 24h without contact.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Valley Crew now free at 2:00p after job slip.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">AR over 60 days increased by $12k.</li>
        </ul>
      </Modal>
    </header>
  );
}
