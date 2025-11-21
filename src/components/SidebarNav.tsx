"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const modes = [
  { key: "my-work", label: "My Work", href: "/" },
  { key: "sell", label: "Sell", href: "/sell" },
  { key: "build", label: "Build", href: "/build" },
  { key: "bill", label: "Bill", href: "/bill" },
  { key: "analyze", label: "Analyze", href: "/analyze" },
  { key: "digital", label: "Digital Presence", href: "/digital" },
  { key: "admin", label: "Admin", href: "/admin" }
];

const personaShortcuts = [
  {
    title: "Production Manager",
    links: ["Schedule", "Jobs", "Permits", "Crews"]
  },
  {
    title: "Sales Rep",
    links: ["Pipeline", "Calendar", "Proposals"]
  }
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-shell-border bg-white px-4 py-6">
      <div className="mb-10 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500 text-white font-semibold">BX</div>
        <div className="leading-tight">
          <p className="text-xs text-slate-500">Workspace</p>
          <p className="font-semibold">Evergreen Roofing</p>
        </div>
      </div>

      <nav className="space-y-2">
        {modes.map((mode) => {
          const active = mode.href === "/" ? pathname === "/" : pathname.startsWith(mode.href);
          return (
            <Link
              key={mode.key}
              href={mode.href}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-slate-100 ${
                active ? "bg-slate-900 text-white" : "text-slate-700"
              }`}
            >
              <span>{mode.label}</span>
              {mode.key === "my-work" && <span className="badge-dot" />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 space-y-4">
        {personaShortcuts.map((persona) => (
          <div key={persona.title} className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{persona.title}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {persona.links.map((link) => (
                <span key={link} className="chip">
                  {link}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
