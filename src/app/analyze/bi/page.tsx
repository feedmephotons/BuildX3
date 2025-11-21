import { AppShell } from "@/components/AppShell";
import { BIChatPanel } from "@/components/BIChatPanel";
import { MockWorkspacePage } from "@/components/MockWorkspacePage";

export default function BIWorkspacePage() {
  return (
    <AppShell>
      <MockWorkspacePage eyebrow="Analyze" title="BI chat" description="Ask any question and let AI build the visual." />
      <BIChatPanel />
    </AppShell>
  );
}
