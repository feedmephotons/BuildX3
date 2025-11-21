import { AppShell } from "@/components/AppShell";
import { MockWorkspacePage } from "@/components/MockWorkspacePage";
import { OpsTable } from "@/components/OpsTable";
import { ScheduleStrip } from "@/components/ScheduleStrip";

export default function DispatchPage() {
  return (
    <AppShell>
      <MockWorkspacePage eyebrow="Build" title="Dispatch" description="Crew scheduling, conflicts, and weather intelligence." />
      <ScheduleStrip />
      <OpsTable />
    </AppShell>
  );
}
