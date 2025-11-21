const metrics = [
  { title: "Revenue", value: "$4.2M", delta: "+12% vs last 30d" },
  { title: "Active jobs", value: "28", delta: "3 at risk" },
  { title: "AR > 30d", value: "$612K", delta: "7 invoices" },
  { title: "Lead velocity", value: "+18%", delta: "Conversion 24%" }
];

export function QuickMetrics() {
  return (
    <section className="grid gap-3 md:grid-cols-4">
      {metrics.map((item) => (
        <div key={item.title} className="card p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">{item.title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
          <p className="text-sm text-slate-600">{item.delta}</p>
        </div>
      ))}
    </section>
  );
}
