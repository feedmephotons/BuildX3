import { AppShell } from "@/components/AppShell";
import { CollectionsTable } from "@/components/CollectionsTable";
import { MockWorkspacePage } from "@/components/MockWorkspacePage";

export default function CollectionsPage() {
  return (
    <AppShell>
      <MockWorkspacePage eyebrow="Bill" title="Collections" description="AR aging, payment plans, and follow-up scripts." />
      <CollectionsTable />
    </AppShell>
  );
}
