import { AppShell } from "@/components/AppShell";
import { MockWorkspacePage } from "@/components/MockWorkspacePage";
import { QuickMetrics } from "@/components/QuickMetrics";

export default function ProposalsPage() {
  return (
    <AppShell>
      <MockWorkspacePage
        eyebrow="Sell"
        title="Quotes & proposals"
        description="Template-driven proposals with AI copy and e-sign previews."
      />
      <QuickMetrics />
    </AppShell>
  );
}
