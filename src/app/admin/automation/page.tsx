import { AppShell } from "@/components/AppShell";
import { MockWorkspacePage } from "@/components/MockWorkspacePage";
import { OpsTable } from "@/components/OpsTable";

export default function AutomationPage() {
  return (
    <AppShell>
      <MockWorkspacePage
        eyebrow="Admin"
        title="Automation builder"
        description="Visual canvas for triggers, conditions, and AI-powered actions."
      >
        <p className="text-sm text-slate-700">This mock showcases how nodes, connectors, and AI text blocks might render.</p>
      </MockWorkspacePage>
      <OpsTable />
    </AppShell>
  );
}
