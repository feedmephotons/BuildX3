import { AppShell } from "@/components/AppShell";
import { LiveBoards } from "@/components/LiveBoards";
import { ModeHighlights } from "@/components/ModeHighlights";
import { MyWorkBoard } from "@/components/MyWorkBoard";
import { QuickMetrics } from "@/components/QuickMetrics";

export default function HomePage() {
  return (
    <AppShell>
      <QuickMetrics />
      <MyWorkBoard />
      <ModeHighlights />
      <LiveBoards />
    </AppShell>
  );
}
