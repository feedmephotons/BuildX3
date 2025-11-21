"use client";

import { useState } from "react";

import { Modal } from "./Modal";

const roles = [
  { role: "Owner", defaultMode: "Analyze", permissions: "All access" },
  { role: "Sales Rep", defaultMode: "Sell", permissions: "Leads, pipeline, proposals" },
  { role: "Production Manager", defaultMode: "Build", permissions: "Jobs, schedule, crews" },
  { role: "AR Manager", defaultMode: "Bill", permissions: "Invoices, payments" }
];

export function AdminRoles() {
  const [modal, setModal] = useState<string | null>(null);

  return (
    <section className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Users & roles</p>
          <p className="text-lg font-semibold text-slate-900">Persona defaults</p>
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white" onClick={() => setModal("invite")}>Invite user</button>
      </div>
      <div className="mt-4 divide-y divide-shell-border">
        {roles.map((item) => (
          <div key={item.role} className="grid gap-3 py-3 sm:grid-cols-3 sm:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-900">{item.role}</p>
              <p className="text-xs text-slate-600">{item.permissions}</p>
            </div>
            <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
              Default mode: {item.defaultMode}
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-full border border-shell-border px-3 py-1 text-xs font-semibold text-slate-700" onClick={() => setModal("access")}>Edit access</button>
              <button className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white" onClick={() => setModal("persona")}>Assign persona</button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modal === "invite"}
        onClose={() => setModal(null)}
        title="Invite user"
        description="Send an invite email with temporary credentials and persona defaults."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Send invite</button>}
      >
        <div className="space-y-2 text-sm text-slate-800">
          <p>Email, role, persona, and default mode selection.</p>
          <p>Optional: enforce MFA and restrict to single workspace.</p>
        </div>
      </Modal>

      <Modal
        open={modal === "access"}
        onClose={() => setModal(null)}
        title="Edit access"
        description="Toggle permissions for pipeline, jobs, billing, and digital tools."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Save policy</button>}
      >
        <ul className="space-y-2 text-sm text-slate-800">
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Pipeline edit + proposal send</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Schedule view + crew assignments</li>
          <li className="rounded-lg border border-shell-border bg-slate-50 p-3">Billing read/write with approvals</li>
        </ul>
      </Modal>

      <Modal
        open={modal === "persona"}
        onClose={() => setModal(null)}
        title="Assign persona"
        description="Personas drive default navigation, dashboards, and shortcuts."
        footer={<button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Apply persona</button>}
      >
        <div className="space-y-2 text-sm text-slate-800">
          <p>Options: Owner/Exec, Sales Rep, Production Manager, AR Manager, Crew Lead.</p>
          <p>Copilot auto-adjusts My Work, command palette suggestions, and mega-menu ordering.</p>
        </div>
      </Modal>
    </section>
  );
}
