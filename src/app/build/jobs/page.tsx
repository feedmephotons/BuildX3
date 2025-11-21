import { AppShell } from "@/components/AppShell";
import { MockWorkspacePage } from "@/components/MockWorkspacePage";
import { OpsTable } from "@/components/OpsTable";

export default function JobsPage() {
  return (
    <AppShell>
      <MockWorkspacePage eyebrow="Build" title="Jobs" description="Digital jackets, timelines, and checklists." />
      <OpsTable />
    </AppShell>
  );
}
