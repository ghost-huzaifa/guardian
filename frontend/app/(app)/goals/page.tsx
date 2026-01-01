"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { GoalTree } from "@/components/goals/goal-tree";
import { GoalForm } from "@/components/goals/goal-form";
import { Modal } from "@/components/ui/modal";
import { Loader2, Plus } from "lucide-react";

import { Goal } from "@/types";

export default function GoalsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState<string | undefined>(undefined);
    const [forcedGoalType, setForcedGoalType] = useState<Goal['goalType'] | undefined>(undefined);

    const { data: goals, isLoading } = useQuery({
        queryKey: ['goals'],
        queryFn: () => apiFetch<any[]>('/goals'),
    });

    const getNextGoalType = (parentType: Goal['goalType']): Goal['goalType'] => {
        switch (parentType) {
            case 'LIFE': return 'YEARLY';
            case 'YEARLY': return 'MONTHLY';
            case 'MONTHLY': return 'WEEKLY';
            case 'ISOLATED': return 'ISOLATED';
            default: return 'ISOLATED';
        }
    };

    const handleOpenModal = (parentId?: string, parentType?: Goal['goalType']) => {
        setSelectedParentId(parentId);
        if (parentType) {
            setForcedGoalType(getNextGoalType(parentType));
        } else {
            setForcedGoalType(undefined);
        }
        setIsModalOpen(true);
    };

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
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 rounded-xl bg-accent-purple px-4 py-2 font-bold text-bg-primary transition-transform active:scale-95"
                >
                    <Plus className="h-5 w-5" />
                    <span>New Goal</span>
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-accent-purple" />
                </div>
            ) : (
                <GoalTree
                    goals={goals || []}
                    onCreateSubGoal={(parentId, parentType) => handleOpenModal(parentId, parentType)}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedParentId ? "Create Sub-Goal" : "Create New Goal"}
            >
                <GoalForm
                    parentId={selectedParentId}
                    forcedType={forcedGoalType}
                    onSuccess={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
