"use client";

import { Shield, Sparkles, Trophy, Zap, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { format } from "date-fns";

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);

    const { data: tasks, isLoading } = useQuery({
        queryKey: ['tasks', 'today'],
        queryFn: () => apiFetch<any[]>('/tasks/today'),
    });

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-accent-purple p-8 text-bg-primary shadow-lg shadow-accent-purple/20">
                <div className="relative z-10">
                    <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                        Good evening, {user?.firstName || 'Guardian'}! ✨
                    </h1>
                    <p className="mt-2 font-mono text-lg font-medium opacity-90">
                        You've crushed {tasks?.filter(t => t.taskStatus === 'DONE').length || 0} tasks today. Keep the streak alive!
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
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
                        </div>
                    ) : tasks && tasks.length > 0 ? (
                        tasks.map((task: any) => (
                            <div key={task.taskId} className="group flex cursor-pointer items-center gap-4 rounded-3xl border-2 border-white/5 bg-bg-elevated p-4 transition-all hover:border-accent-purple/50 hover:bg-bg-secondary">
                                <div className={`flex h-6 w-6 flex-none items-center justify-center rounded-lg border-2 transition-colors ${task.isCompleted ? 'bg-accent-green border-accent-green' : 'border-text-muted group-hover:border-accent-purple'}`}>
                                    {task.isCompleted && <Shield className="h-4 w-4 text-bg-primary fill-current" />}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-medium ${task.isCompleted ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                                        {task.title}
                                    </h3>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${task.taskPriority === 'P1_URGENT' ? 'bg-priority-p1/20 text-priority-p1' :
                                                task.taskPriority === 'P2_HIGH' ? 'bg-priority-p2/20 text-priority-p2' :
                                                    task.taskPriority === 'P3_MEDIUM' ? 'bg-priority-p3/20 text-priority-p3' :
                                                        'bg-priority-p4/20 text-priority-p4'
                                            }`}>
                                            {task.taskPriority?.replace('P', '').replace('_', ' ')}
                                        </span>
                                        <span className="font-mono text-[10px] text-text-muted">
                                            {task.energyLevel?.toLowerCase().replace('_', ' ')} • {task.estimatedMinutes}m
                                        </span>
                                    </div>
                                </div>
                                {task.goal && (
                                    <div className="hidden rounded-xl bg-bg-primary px-3 py-1 font-mono text-xs text-accent-pink md:block">
                                        → {task.goal.title}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="rounded-3xl border-2 border-dashed border-white/10 p-8 text-center text-text-muted">
                            No active quests for today. Check your quest log!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
