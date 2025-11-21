import { AppShell } from "@/components/AppShell";
import { CollectionsTable } from "@/components/CollectionsTable";
import { LiveBoards } from "@/components/LiveBoards";
import { QuickMetrics } from "@/components/QuickMetrics";

export default function BillPage() {
  return (
    <AppShell>
      <QuickMetrics />
      <LiveBoards />
      <CollectionsTable />
    </AppShell>
  );
}
