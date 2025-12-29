import { Shield, Sparkles, Trophy, Zap } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-accent-purple p-8 text-bg-primary shadow-lg shadow-accent-purple/20">
                <div className="relative z-10">
                    <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                        Good evening, Huzaifa! ✨
                    </h1>
                    <p className="mt-2 font-mono text-lg font-medium opacity-90">
                        You've crushed 5 tasks today. Keep the streak alive!
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
                <div className="absolute -bottom-12 right-24 h-32 w-32 rounded-full bg-accent-pink/40 blur-2xl" />
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    {
                        label: "Current Streak",
                        value: "12 Days",
                        icon: Zap,
                        color: "text-accent-yellow",
                        bg: "bg-accent-yellow/10",
                    },
                    {
                        label: "Tasks Done",
                        value: "1,248",
                        icon: Trophy,
                        color: "text-accent-green",
                        bg: "bg-accent-green/10",
                    },
                    {
                        label: "Focus Time",
                        value: "48h",
                        icon: Shield,
                        color: "text-accent-blue",
                        bg: "bg-accent-blue/10",
                    },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="group relative overflow-hidden rounded-3xl border-2 border-white/5 bg-bg-elevated p-6 transition-all hover:-translate-y-1 hover:border-white/10 hover:shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-mono text-xs font-bold uppercase tracking-wider text-text-muted">
                                    {stat.label}
                                </p>
                                <p className={`mt-2 font-display text-3xl font-bold ${stat.color}`}>
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`rounded-2xl p-3 ${stat.bg} ${stat.color}`}>
                                <stat.icon className="h-6 w-6 stroke-2 transition-transform group-hover:rotate-12" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Today's Focus Section */}
            <div>
                <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold">
                    <Sparkles className="h-6 w-6 text-accent-orange" />
                    Today's Focus
                </h2>

                <div className="space-y-3">
                    {/* Mock Task 1 */}
                    <div className="group flex cursor-pointer items-center gap-4 rounded-3xl border-2 border-white/5 bg-bg-elevated p-4 transition-all hover:border-accent-purple/50 hover:bg-bg-secondary">
                        <div className="flex h-6 w-6 flex-none items-center justify-center rounded-lg border-2 border-text-muted transition-colors group-hover:border-accent-purple" />
                        <div className="flex-1">
                            <h3 className="font-medium text-text-primary">
                                Read Chapter 1 of Linear Algebra
                            </h3>
                            <div className="mt-1 flex items-center gap-2">
                                <span className="rounded-full bg-priority-p1/20 px-2 py-0.5 text-[10px] font-bold text-priority-p1">
                                    P1 URGENT
                                </span>
                                <span className="font-mono text-[10px] text-text-muted">
                                    High Focus • 45m
                                </span>
                            </div>
                        </div>
                        <div className="hidden rounded-xl bg-bg-primary px-3 py-1 font-mono text-xs text-accent-pink md:block">
                            → Complete Master's
                        </div>
                    </div>

                    {/* Mock Task 2 */}
                    <div className="group flex cursor-pointer items-center gap-4 rounded-3xl border-2 border-white/5 bg-bg-elevated p-4 transition-all hover:border-accent-orange/50 hover:bg-bg-secondary">
                        <div className="flex h-6 w-6 flex-none items-center justify-center rounded-lg border-2 border-text-muted transition-colors group-hover:border-accent-orange" />
                        <div className="flex-1">
                            <h3 className="font-medium text-text-primary">
                                Review PR for auth module
                            </h3>
                            <div className="mt-1 flex items-center gap-2">
                                <span className="rounded-full bg-priority-p3/20 px-2 py-0.5 text-[10px] font-bold text-priority-p3">
                                    P3 MEDIUM
                                </span>
                                <span className="font-mono text-[10px] text-text-muted">
                                    Medium Energy
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
