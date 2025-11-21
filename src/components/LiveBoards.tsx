const pipeline = [
  { lead: "Lisa Gray", stage: "Negotiation", value: "$28,400", score: 86 },
  { lead: "Marco Silva", stage: "Proposed", value: "$18,700", score: 71 },
  { lead: "Oakwood HOA", stage: "Inspected", value: "$122,400", score: 63 }
];

const schedule = [
  { job: "Job 1442 · Gray Residence", crew: "Valley Crew", when: "Thu, 9:00a", status: "Weather" },
  { job: "Job 1431 · Johnson", crew: "Summit Crew", when: "Today, 1:00p", status: "Ready" },
  { job: "Job 1427 · Oakwood", crew: "Subcontractor", when: "Fri, 8:00a", status: "Permit" }
];

const money = [
  { label: "Invoices due this week", value: "$184K", hint: "Send plan + offer ACH" },
  { label: "Supplements in draft", value: "$62K", hint: "AI suggests 4 code items" },
  { label: "Commissions ready", value: "$74K", hint: "Approve by Friday" }
];

export function LiveBoards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="card p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">Pipeline</p>
          <span className="chip">AI scoring</span>
        </div>
        <div className="space-y-3">
          {pipeline.map((lead) => (
            <div key={lead.lead} className="rounded-xl border border-shell-border bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{lead.lead}</p>
                  <p className="text-xs text-slate-500">{lead.stage}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{lead.value}</p>
                  <p className="text-xs font-semibold text-accent-600">Score {lead.score}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">Schedule</p>
          <span className="chip">Conflicts</span>
        </div>
        <div className="space-y-3">
          {schedule.map((entry) => (
            <div key={entry.job} className="rounded-xl border border-shell-border bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{entry.job}</p>
                  <p className="text-xs text-slate-500">{entry.crew}</p>
                </div>
                <div className="text-right text-xs font-semibold text-slate-700">
                  <p>{entry.when}</p>
                  <p className="text-accent-600">{entry.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">Money</p>
          <span className="chip">Collections</span>
        </div>
        <div className="space-y-3">
          {money.map((item) => (
            <div key={item.label} className="rounded-xl border border-shell-border bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="text-sm font-semibold text-slate-900">{item.value}</p>
              </div>
              <p className="text-xs text-slate-600">{item.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
