import { AppShell } from "@/components/AppShell";
import { OpsTable } from "@/components/OpsTable";
import { QuickMetrics } from "@/components/QuickMetrics";
import { ScheduleStrip } from "@/components/ScheduleStrip";

export default function BuildPage() {
  return (
    <AppShell>
      <QuickMetrics />
      <ScheduleStrip />
      <OpsTable />
    </AppShell>
  );
}
