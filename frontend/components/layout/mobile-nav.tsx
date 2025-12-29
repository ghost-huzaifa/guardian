"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Target,
    Calendar,
    Inbox,
    Plus, // Placeholder for quick add
} from "lucide-react";

export function MobileNav() {
    const pathname = usePathname();

    const navItems = [
        { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Goals", icon: Target, href: "/goals" },
        { label: "Add", icon: Plus, href: "/add", isAction: true }, // Central action button
        { label: "Today", icon: Calendar, href: "/today" },
        { label: "Inbox", icon: Inbox, href: "/inbox" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-white/5 bg-bg-primary/90 px-6 pb-6 pt-2 backdrop-blur-lg md:hidden">
            <nav className="flex items-center justify-between">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    if (item.isAction) {
                        return (
                            <button
                                key={item.href}
                                className="group -mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-purple shadow-lg shadow-accent-purple/30 transition-transform active:scale-90"
                            >
                                <Plus className="h-8 w-8 text-bg-primary transition-transform group-hover:rotate-90" />
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1",
                                isActive ? "text-accent-purple" : "text-text-muted"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-6 w-6 transition-all",
                                    isActive ? "scale-110 fill-current" : "stroke-[1.5px]"
                                )}
                            />
                            <span className="font-mono text-[10px] font-medium">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
