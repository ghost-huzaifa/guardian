"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Target,
    Calendar,
    Inbox,
    Settings,
    Shield,
    Plus,
} from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Goals", icon: Target, href: "/goals" },
        { label: "Today", icon: Calendar, href: "/today" },
        { label: "Inbox", icon: Inbox, href: "/inbox" },
    ];

    return (
        <aside className="hidden h-screen w-64 flex-col border-r-2 border-dashed border-white/10 bg-bg-secondary p-4 md:flex">
            {/* Brand */}
            <div className="mb-8 flex items-center gap-3 px-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-purple text-bg-primary shadow-lg shadow-accent-purple/20">
                    <Shield className="h-6 w-6 fill-current" />
                </div>
                <span className="font-display text-xl font-bold tracking-tight text-text-primary">
                    Guardian
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-2xl px-4 py-3 font-mono text-sm font-medium transition-all hover:scale-105 active:scale-95",
                                isActive
                                    ? "bg-accent-purple text-bg-primary shadow-md shadow-accent-purple/20"
                                    : "text-text-muted hover:bg-bg-elevated hover:text-text-primary"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-5 w-5 transition-transform group-hover:rotate-12",
                                    isActive ? "stroke-2" : "stroke-[1.5px]"
                                )}
                            />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto space-y-4">
                <div className="rounded-3xl bg-bg-elevated p-4">
                    <p className="mb-2 font-mono text-xs text-text-muted">
                        Daily Progress
                    </p>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-bg-primary">
                        <div className="h-full w-[65%] rounded-full bg-accent-green" />
                    </div>
                    <p className="mt-1 text-right font-mono text-xs font-bold text-accent-green">
                        65%
                    </p>
                </div>

                <button className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-white/10 p-3 font-mono text-sm font-bold text-text-muted transition-all hover:bg-bg-elevated hover:text-text-primary">
                    <Settings className="h-5 w-5 transition-transform group-hover:rotate-90" />
                    Settings
                </button>
            </div>
        </aside>
    );
}
