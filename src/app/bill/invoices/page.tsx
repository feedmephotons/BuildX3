import { AppShell } from "@/components/AppShell";
import { MockWorkspacePage } from "@/components/MockWorkspacePage";
import { QuickMetrics } from "@/components/QuickMetrics";

export default function InvoicesPage() {
  return (
    <AppShell>
      <MockWorkspacePage eyebrow="Bill" title="Invoices" description="Send, track, and reconcile invoices with AI guidance." />
      <QuickMetrics />
    </AppShell>
  );
}
