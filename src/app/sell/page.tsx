import { AppShell } from "@/components/AppShell";
import { LeadDossier } from "@/components/LeadDossier";
import { QuickMetrics } from "@/components/QuickMetrics";
import { SalesPipeline } from "@/components/SalesPipeline";

export default function SellPage() {
  return (
    <AppShell>
      <QuickMetrics />
      <SalesPipeline />
      <LeadDossier />
    </AppShell>
  );
}
