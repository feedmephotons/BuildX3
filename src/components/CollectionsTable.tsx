const invoices = [
  { id: "INV-2041", customer: "Gray Residence", amount: "$18,400", age: "14d", risk: "Medium" },
  { id: "INV-2032", customer: "Oakwood HOA", amount: "$122,400", age: "37d", risk: "High" },
  { id: "INV-1994", customer: "Willow Estates", amount: "$62,800", age: "62d", risk: "High" },
  { id: "INV-1988", customer: "Birchwood Homes", amount: "$21,700", age: "9d", risk: "Low" }
];

export function CollectionsTable() {
  return (
    <section className="card">
      <div className="flex items-center justify-between border-b border-shell-border px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Bill</p>
          <h2 className="text-lg font-semibold text-slate-900">AR & collections</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="rounded-full bg-slate-100 px-3 py-1">AI risk scores</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Follow-up plan</span>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-shell-border text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Invoice</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-shell-border">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">{invoice.id}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{invoice.customer}</td>
                <td className="px-4 py-3 text-sm font-semibold text-slate-900">{invoice.amount}</td>
                <td className="px-4 py-3 text-xs font-semibold text-slate-600">{invoice.age}</td>
                <td className="px-4 py-3 text-xs font-semibold text-accent-600">{invoice.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
