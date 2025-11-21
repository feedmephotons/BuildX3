import { AppShell } from "@/components/AppShell";
import { BIChatPanel } from "@/components/BIChatPanel";
import { ExecDashboard } from "@/components/ExecDashboard";
import { MarketIntel } from "@/components/MarketIntel";
import { QuickMetrics } from "@/components/QuickMetrics";

export default function Page() {
  return (
    <AppShell>
      <QuickMetrics />
      <ExecDashboard />
      <BIChatPanel />
      <MarketIntel />
    </AppShell>
  );
}
