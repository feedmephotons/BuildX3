const rows = [
  { job: "Job 1442 · Gray", status: "At risk", blocker: "Weather 48h", owner: "Valley Crew" },
  { job: "Job 1427 · Oakwood", status: "Blocked", blocker: "Permit", owner: "Ops" },
  { job: "Job 1311 · Birchwood", status: "Ready", blocker: "Materials confirmed", owner: "Summit Crew" },
  { job: "Job 1102 · Pinecrest", status: "Inspection", blocker: "City", owner: "Ops" }
];

export function OpsTable() {
  return (
    <section className="card">
      <div className="flex items-center justify-between border-b border-shell-border px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Operations Hub</p>
          <h2 className="text-lg font-semibold text-slate-900">Jobs + logistics lens</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="rounded-full bg-slate-100 px-3 py-1">Lens: Jobs</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Saved view: Permits pending</span>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-shell-border text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Job</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Blocker</th>
              <th className="px-4 py-3">Owner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-shell-border">
            {rows.map((row) => (
              <tr key={row.job} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">{row.job}</td>
                <td className="px-4 py-3 text-xs font-semibold text-accent-600">{row.status}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{row.blocker}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{row.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
