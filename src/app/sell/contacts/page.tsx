import { AppShell } from "@/components/AppShell";
import { LeadDossier } from "@/components/LeadDossier";
import { MockWorkspacePage } from "@/components/MockWorkspacePage";

export default function ContactsPage() {
  return (
    <AppShell>
      <MockWorkspacePage
        eyebrow="Sell"
        title="Contacts & accounts"
        description="Unified dossier view for homeowners, HOAs, and commercial accounts."
      />
      <LeadDossier />
    </AppShell>
  );
}
