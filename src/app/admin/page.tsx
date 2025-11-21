import { AppShell } from "@/components/AppShell";
import { AdminFeatureFlags } from "@/components/AdminFeatureFlags";
import { AdminRoles } from "@/components/AdminRoles";
import { QuickMetrics } from "@/components/QuickMetrics";

export default function Page() {
  return (
    <AppShell>
      <QuickMetrics />
      <AdminFeatureFlags />
      <AdminRoles />
    </AppShell>
  );
}
