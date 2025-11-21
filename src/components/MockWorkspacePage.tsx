import type { ReactNode } from "react";

export function MockWorkspacePage({
  title,
  eyebrow,
  description,
  children
}: {
  title: string;
  eyebrow: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">{eyebrow}</p>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">Mock view</span>
      </div>
      {children && <div className="mt-4 space-y-3">{children}</div>}
    </section>
  );
}
