"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { GoalTree } from "@/components/goals/goal-tree";
import { Loader2, Plus } from "lucide-react";

export default function GoalsPage() {
    const { data: goals, isLoading } = useQuery({
        queryKey: ['goals'],
        queryFn: () => apiFetch<any[]>('/goals'),
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary">
                        Quest Board 🗺️
                    </h1>
                    <p className="mt-2 font-mono text-text-muted">
                        Visualizing your path to greatness.
                    </p>
                </div>
                <button className="flex items-center gap-2 rounded-xl bg-accent-purple px-4 py-2 font-bold text-bg-primary transition-transform active:scale-95">
                    <Plus className="h-5 w-5" />
                    <span>New Goal</span>
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-accent-purple" />
                </div>
            ) : (
                <GoalTree goals={goals || []} />
            )}
        </div>
    );
}
