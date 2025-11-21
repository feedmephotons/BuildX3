import { AppShell } from "@/components/AppShell";
import { MarketIntel } from "@/components/MarketIntel";
import { MockWorkspacePage } from "@/components/MockWorkspacePage";

export default function ReviewsPage() {
  return (
    <AppShell>
      <MockWorkspacePage eyebrow="Digital" title="Reviews & reputation" description="Monitor reviews, respond with AI, and trigger requests." />
      <MarketIntel />
    </AppShell>
  );
}
