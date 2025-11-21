"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckSquare,
  Target,
  Hammer,
  DollarSign,
  BarChart3,
  Globe,
  Settings,
  Command,
  ChevronRight,
  Sparkles,
  Users,
  Kanban,
  FileText,
  CalendarDays,
  Briefcase,
  HardHat,
  Truck,
  Receipt,
  CreditCard,
  Clock,
  TrendingUp,
  PieChart,
  Search,
  Star,
  UserCog,
  Workflow,
  type LucideIcon,
} from "lucide-react";

interface SubItem {
  id: string;
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  subItems?: SubItem[];
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "my-work",
    label: "My Work",
    href: "/",
    icon: CheckSquare,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    subItems: [
      { id: "action-queue", label: "Action Queue", href: "/", description: "AI-prioritized tasks for today", icon: CheckSquare },
      { id: "calendar", label: "Calendar", href: "/", description: "Your schedule at a glance", icon: CalendarDays },
      { id: "notifications", label: "Notifications", href: "/", description: "Alerts and updates", icon: Sparkles },
    ],
  },
  {
    id: "sell",
    label: "Sell",
    href: "/sell",
    icon: Target,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    subItems: [
      { id: "pipeline", label: "Pipeline", href: "/sell", description: "Track deals through stages", icon: Kanban },
      { id: "contacts", label: "Contacts", href: "/sell/contacts", description: "Customer & lead database", icon: Users },
      { id: "proposals", label: "Proposals", href: "/sell/proposals", description: "Generate and send quotes", icon: FileText },
      { id: "war-room", label: "War Room", href: "/sell/war-room", description: "Real-time sales dashboard", icon: TrendingUp },
    ],
  },
  {
    id: "build",
    label: "Build",
    href: "/build",
    icon: Hammer,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    subItems: [
      { id: "jobs", label: "Jobs", href: "/build/jobs", description: "Active project tracking", icon: Briefcase },
      { id: "dispatch", label: "Dispatch", href: "/build/dispatch", description: "Crew scheduling & routing", icon: Truck },
      { id: "crews", label: "Crews", href: "/build", description: "Team management", icon: HardHat },
    ],
  },
  {
    id: "bill",
    label: "Bill",
    href: "/bill",
    icon: DollarSign,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    subItems: [
      { id: "invoices", label: "Invoices", href: "/bill/invoices", description: "Create and track invoices", icon: Receipt },
      { id: "collections", label: "Collections", href: "/bill/collections", description: "AR aging and follow-ups", icon: Clock },
      { id: "payments", label: "Payments", href: "/bill", description: "Payment processing", icon: CreditCard },
    ],
  },
  {
    id: "analyze",
    label: "Analyze",
    href: "/analyze",
    icon: BarChart3,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    subItems: [
      { id: "dashboard", label: "Dashboard", href: "/analyze", description: "KPIs and metrics", icon: PieChart },
      { id: "bi-chat", label: "BI Chat", href: "/analyze/bi", description: "Ask AI about your data", icon: Sparkles },
      { id: "reports", label: "Reports", href: "/analyze", description: "Custom report builder", icon: TrendingUp },
    ],
  },
  {
    id: "digital",
    label: "Digital",
    href: "/digital",
    icon: Globe,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    subItems: [
      { id: "website", label: "Website", href: "/digital", description: "Site builder & CMS", icon: Globe },
      { id: "reviews", label: "Reviews", href: "/digital/reviews", description: "Reputation management", icon: Star },
      { id: "seo", label: "SEO", href: "/digital", description: "Search optimization", icon: Search },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    href: "/admin",
    icon: Settings,
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    subItems: [
      { id: "users", label: "Users & Roles", href: "/admin", description: "Team permissions", icon: UserCog },
      { id: "automation", label: "Automation", href: "/admin/automation", description: "Workflow builder", icon: Workflow },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [flyoutTop, setFlyoutTop] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (itemId: string, buttonElement: HTMLButtonElement) => {
    setHoveredItem(itemId);

    // Calculate position relative to container
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = buttonElement.getBoundingClientRect();
      const relativeTop = buttonRect.top - containerRect.top;
      setFlyoutTop(relativeTop);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex h-full relative z-50"
      onMouseLeave={() => setHoveredItem(null)}
    >
      {/* The Rail */}
      <nav className="w-20 bg-white border-r border-shell-border flex flex-col items-center py-6 z-20 relative">
        <div className="mb-8 w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
          <Command size={20} />
        </div>

        <div className="flex-1 space-y-2 w-full px-2">
          {NAV_ITEMS.map((item) => {
            const isHovered = hoveredItem === item.id;
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <button
                key={item.id}
                onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
                className={`w-full aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 relative group
                  ${isActive ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"}`}
              >
                <item.icon
                  className={`w-5 h-5 transition-all duration-150 group-hover:scale-110 ${isActive ? item.color : "text-current"}`}
                  strokeWidth={2}
                />
                <span className="text-[9px] font-medium">{item.label}</span>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-slate-900 rounded-r-full"
                    transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                  />
                )}

                {/* Hover glow */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hoverGlow"
                    className={`absolute inset-0 rounded-2xl ${item.bgColor} opacity-50`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* AI Copilot button */}
        <div className="mt-auto pt-4 border-t border-shell-border w-full px-2">
          <button className="w-full aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-accent-600 hover:bg-accent-500/10 transition-all duration-200">
            <Sparkles className="w-5 h-5" />
            <span className="text-[9px] font-medium">Copilot</span>
          </button>
        </div>
      </nav>

      {/* The Mega Menu Flyout - positioned relative to hovered item */}
      <AnimatePresence>
        {hoveredItem && NAV_ITEMS.find((i) => i.id === hoveredItem)?.subItems && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -16, scale: 0.98 }}
            transition={{
              duration: 0.2,
              ease: [0.32, 0.72, 0, 1],
              opacity: { duration: 0.15 },
            }}
            style={{
              top: Math.max(0, Math.min(flyoutTop, (containerRef.current?.clientHeight || 600) - 400)),
            }}
            className="absolute left-20 w-80 bg-white/98 backdrop-blur-xl border border-shell-border rounded-2xl z-10 overflow-hidden shadow-2xl origin-left"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                {(() => {
                  const activeItem = NAV_ITEMS.find((i) => i.id === hoveredItem);
                  if (!activeItem) return null;
                  return (
                    <>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                        className={`p-2.5 rounded-xl ${activeItem.bgColor}`}
                      >
                        <activeItem.icon className={`w-5 h-5 ${activeItem.color}`} />
                      </motion.div>
                      <div>
                        <motion.h2
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.05 }}
                          className="text-base font-bold text-slate-900"
                        >
                          {activeItem.label}
                        </motion.h2>
                        <p className="text-[11px] text-slate-500">Navigate to modules</p>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Sub Items */}
              <div className="space-y-2">
                {NAV_ITEMS.find((i) => i.id === hoveredItem)?.subItems?.map((sub, index) => {
                  const parentItem = NAV_ITEMS.find((i) => i.id === hoveredItem);
                  return (
                    <motion.div
                      key={sub.id}
                      initial={{ opacity: 0, x: -12, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.04,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      <Link
                        href={sub.href}
                        onClick={() => setHoveredItem(null)}
                        className={`group w-full p-3 rounded-xl border transition-all duration-150 ease-out flex items-start gap-3
                          hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                          bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-white`}
                      >
                        <div
                          className={`p-2 rounded-lg shadow-sm transition-all duration-150 group-hover:scale-110
                            ${parentItem?.bgColor} ring-1 ring-slate-100 group-hover:ring-slate-200`}
                        >
                          <sub.icon className={`w-4 h-4 ${parentItem?.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-900 group-hover:text-slate-900 text-sm">
                            {sub.label}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 truncate">{sub.description}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all duration-150 mt-1" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Actions Footer */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.15 }}
                className="mt-4 pt-4 border-t border-slate-100"
              >
                <div className="p-3 rounded-xl bg-gradient-to-r from-accent-500/10 to-accent-600/10 border border-accent-500/20">
                  <div className="flex items-center gap-2 text-accent-600 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wide">AI Insight</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mb-2">
                    {hoveredItem === "sell" && "3 hot leads need follow-up today"}
                    {hoveredItem === "build" && "2 jobs at weather risk this week"}
                    {hoveredItem === "bill" && "$8.2k in overdue invoices"}
                    {hoveredItem === "analyze" && "Revenue up 12% vs last month"}
                    {hoveredItem === "my-work" && "5 high-priority items pending"}
                    {hoveredItem === "digital" && "Website traffic up 24%"}
                    {hoveredItem === "admin" && "All systems operational"}
                  </p>
                  <button className="w-full py-1.5 bg-white rounded-lg text-[11px] font-semibold text-accent-600 shadow-sm border border-accent-500/20 hover:bg-accent-50 transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
