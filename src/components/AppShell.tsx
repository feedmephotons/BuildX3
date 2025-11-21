"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { CommandPalette } from "./CommandPalette";
import { CopilotPanel } from "./CopilotPanel";
import { SidebarNav } from "./SidebarNav";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="min-h-screen">
      <TopBar onOpenPalette={() => setPaletteOpen(true)} />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 px-8 py-6">
          <div className="flex flex-col gap-6">{children}</div>
        </main>
        <CopilotPanel />
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
