const summaryCards = [
  { title: "MTD revenue", value: "$1.28M", change: "+14% vs last 30d" },
  { title: "Gross margin", value: "36.4%", change: "Target 35%" },
  { title: "Pipeline", value: "$9.4M", change: "Win rate 32%" },
  { title: "AR over 60d", value: "$188K", change: "-6% WoW" }
];

const pipelineStages = [
  { label: "New", value: 124, delta: "+18" },
  { label: "Inspected", value: 96, delta: "+6" },
  { label: "Proposed", value: 72, delta: "-3" },
  { label: "Negotiation", value: 31, delta: "+4" },
  { label: "Closed won", value: 18, delta: "+2" }
];

const marginInsights = [
  {
    title: "Top performer",
    detail: "Solar Shingles bundle | Margin 42% | Avg cycle 9.2 days"
  },
  {
    title: "Leak risk",
    detail: "3 asphalt crews overbooked Friday; reschedule to avoid overtime burn"
  },
  {
    title: "Profit drag",
    detail: "Material variance creeping on steep-slope installs (+6% vs estimate)"
  }
];

export function ExecDashboard() {
  return (
    <section className="space-y-6">
      <div className="grid gap-3 md:grid-cols-4">
        {summaryCards.map((item) => (
          <div key={item.title} className="card p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.title}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
            <p className="text-sm text-slate-600">{item.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Pipeline velocity</p>
              <p className="text-lg font-semibold text-slate-900">Stage flow (last 30d)</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
              AI watching
            </span>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-3">
            {pipelineStages.map((stage) => (
              <div key={stage.label} className="rounded-xl border border-shell-border bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">{stage.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{stage.value}</p>
                <p className="text-xs font-semibold text-accent-600">{stage.delta}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Margin guardrails</p>
          <p className="text-lg font-semibold text-slate-900">Optimizer alerts</p>
          <div className="mt-3 space-y-3">
            {marginInsights.map((item) => (
              <div key={item.title} className="rounded-xl bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-700">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
