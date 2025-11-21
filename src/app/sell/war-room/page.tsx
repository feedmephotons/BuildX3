import { AppShell } from "@/components/AppShell";
import { MockWorkspacePage } from "@/components/MockWorkspacePage";
import { SalesPipeline } from "@/components/SalesPipeline";

export default function SellWarRoomPage() {
  return (
    <AppShell>
      <MockWorkspacePage
        eyebrow="Sell"
        title="Sales War Room"
        description="Blended kanban + table with AI nudges for focus time."
      >
        <p className="text-sm text-slate-700">Use this mock view to showcase how the War Room pulls together pipeline, call lists, and AI coaching.</p>
      </MockWorkspacePage>
      <SalesPipeline />
    </AppShell>
  );
}
