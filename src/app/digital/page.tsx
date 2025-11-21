import { AppShell } from "@/components/AppShell";
import { QuickMetrics } from "@/components/QuickMetrics";
import { SEOBoard } from "@/components/SEOBoard";
import { WebsiteManager } from "@/components/WebsiteManager";

export default function Page() {
  return (
    <AppShell>
      <QuickMetrics />
      <WebsiteManager />
      <SEOBoard />
    </AppShell>
  );
}
