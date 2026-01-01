"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Goal } from "@/types";
import { Loader2, Save } from "lucide-react";

interface GoalFormProps {
    onSuccess: () => void;
    parentId?: string;
    forcedType?: Goal['goalType'];
}

export function GoalForm({ onSuccess, parentId, forcedType }: GoalFormProps) {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [goalType, setGoalType] = useState<Goal['goalType']>(forcedType || 'LIFE');
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");


    const createGoalMutation = useMutation({
        mutationFn: async (data: any) => {
            return apiFetch('/goals', {
                method: 'POST',
                body: data,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['goals'] });
            onSuccess();
        },
        onError: (err: any) => {
            setError(err.message || "Failed to create goal");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        createGoalMutation.mutate({
            title,
            description,
            goalType: forcedType || goalType,
            dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
            parentGoalId: parentId || undefined,
        });
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    Goal Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Become a chaotic good wizard"
                    className="w-full rounded-xl border-2 border-white/10 bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted/50 focus:border-accent-purple focus:outline-none focus:ring-4 focus:ring-accent-purple/10"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Describe your epic quest..."
                    className="w-full resize-none rounded-xl border-2 border-white/10 bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted/50 focus:border-accent-purple focus:outline-none focus:ring-4 focus:ring-accent-purple/10"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {!forcedType && (
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                            Type
                        </label>
                        <div className="relative">
                            <select
                                value={goalType}
                                onChange={(e) => setGoalType(e.target.value as Goal['goalType'])}
                                className="w-full appearance-none rounded-xl border-2 border-white/10 bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary focus:border-accent-purple focus:outline-none focus:ring-4 focus:ring-accent-purple/10"
                            >
                                <option value="LIFE">Life Goal 🏆</option>
                                <option value="ISOLATED">Side Quest ⚔️</option>
                            </select>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                                ▼
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                        Due Date
                    </label>
                    <input
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full rounded-xl border-2 border-white/10 bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary focus:border-accent-purple focus:outline-none focus:ring-4 focus:ring-accent-purple/10"
                    />
                </div>
            </div>


            {error && (
                <div className="rounded-xl bg-accent-red/10 p-3 text-center text-sm font-bold text-accent-red">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={createGoalMutation.isPending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-purple py-3 font-display text-lg font-bold text-bg-primary transition-transform active:scale-95 disabled:opacity-70 disabled:active:scale-100"
            >
                {createGoalMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <>
                        <Save className="h-5 w-5" />
                        Create Goal
                    </>
                )}
            </button>
        </form>
    );
}
