"use client";

import { useState } from "react";

import { Modal } from "./Modal";

const schedule = [
  { label: "Today", jobs: ["Job 1431 · Johnson · Ready", "Job 1427 · Oakwood · Permit"] },
  { label: "Thu", jobs: ["Job 1442 · Gray · Weather", "Job 1311 · Birchwood · Ready"] },
  { label: "Fri", jobs: ["Job 1188 · Willow · Materials", "Job 1102 · Pinecrest · Inspection"] }
];

export function ScheduleStrip() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="card">
      <div className="flex items-center justify-between border-b border-shell-border px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Build</p>
          <h2 className="text-lg font-semibold text-slate-900">Scheduling & dispatch</h2>
        </div>
        <button
          className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
          onClick={() => setModalOpen(true)}
        >
          Optimize today
        </button>
      </div>
      <div className="grid gap-4 p-6 md:grid-cols-3">
        {schedule.map((day) => (
          <div key={day.label} className="space-y-3 rounded-2xl border border-shell-border bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{day.label}</p>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-600">
                {day.jobs.length} jobs
              </span>
            </div>
            <div className="space-y-2">
              {day.jobs.map((job) => (
                <div key={job} className="rounded-lg border border-shell-border bg-white p-3 text-sm text-slate-800 shadow-sm">
                  {job}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Dispatch optimizer"
        description="AI reorders crews by drive time, weather risk, and skill coverage."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Apply changes</button>}
      >
        <ul className="space-y-2 text-sm text-slate-800">
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Swap Valley Crew to Job 1442 after 11a to dodge rain.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Move Oakwood permit follow-up earlier; frees crew for emergency.</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Suggest staging materials tonight for Willow to start early Fri.</li>
        </ul>
      </Modal>
    </section>
  );
}
