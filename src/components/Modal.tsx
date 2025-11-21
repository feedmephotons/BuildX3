"use client";

import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
};

export function Modal({ open, title, description, children, footer, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-shell-border px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Preview</p>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            {description && <p className="text-sm text-slate-600">{description}</p>}
          </div>
          <button
            aria-label="Close modal"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        <div className="space-y-3 px-5 py-4 text-sm text-slate-800">{children}</div>

        {footer && <div className="border-t border-shell-border px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}
