"use client";

import { useState } from "react";
import { Goal } from "@/types";
import { ChevronRight, ChevronDown, Trophy, Calendar, Target, Flag, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface GoalNodeProps {
    goal: Goal;
    level?: number;
    onCreateSubGoal: (parentId: string, parentType: Goal['goalType']) => void;
}

const GoalTypeIcon = ({ type }: { type: Goal['goalType'] }) => {
    switch (type) {
        case 'LIFE': return <Trophy className="h-5 w-5 text-accent-yellow" />;
        case 'YEARLY': return <Calendar className="h-5 w-5 text-accent-green" />;
        case 'MONTHLY': return <Target className="h-5 w-5 text-accent-blue" />;
        case 'WEEKLY': return <Flag className="h-5 w-5 text-accent-pink" />;
        default: return <Target className="h-5 w-5 text-text-muted" />;
    }
};

const GoalNode = ({ goal, level = 0, onCreateSubGoal }: GoalNodeProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = (goal.subGoals && goal.subGoals.length > 0) || (goal.tasks && goal.tasks.length > 0);

    return (
        <div className="relative">
            {/* Connecting Line for children */}
            {level > 0 && (
                <div className="absolute -left-6 top-6 h-full w-px bg-white/10" />
            )}

            <div className={`relative mb-4 group`}>
                {/* Connector to parent */}
                {level > 0 && (
                    <div className="absolute -left-6 top-6 h-px w-6 bg-white/10" />
                )}

                <div className={cn(
                    "relative flex items-center gap-3 rounded-2xl border-2 border-white/5 bg-bg-elevated p-4 transition-all hover:border-white/10 hover:shadow-lg",
                    goal.isCompleted && "opacity-60 grayscale"
                )}>
                    {/* Expand Toggle */}
                    {hasChildren ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                            className="flex h-8 w-8 flex-none items-center justify-center rounded-lg hover:bg-white/5"
                        >
                            {isExpanded ? (
                                <ChevronDown className="h-5 w-5 text-text-muted" />
                            ) : (
                                <ChevronRight className="h-5 w-5 text-text-muted" />
                            )}
                        </button>
                    ) : (
                        <div className="w-8 flex-none" />
                    )}

                    {/* Type Icon */}
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-bg-secondary">
                        <GoalTypeIcon type={goal.goalType} />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="truncate font-display font-medium text-text-primary">
                                {goal.title}
                            </h3>
                            <span className="rounded-md bg-bg-secondary px-2 py-0.5 text-[10px] font-bold text-text-muted">
                                {goal.progressPercent}%
                            </span>

                            {goal.goalType !== 'WEEKLY' && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCreateSubGoal(goal.goalId, goal.goalType);
                                    }}
                                    className="invisible ml-auto flex h-6 w-6 items-center justify-center rounded-lg hover:bg-white/10 group-hover:visible"
                                    title="Add Sub-goal"
                                >
                                    <Plus className="h-4 w-4 text-text-muted" />
                                </button>
                            )}
                        </div>
                        {goal.description && (
                            <p className="truncate text-xs text-text-muted">
                                {goal.description}
                            </p>
                        )}

                        {/* Progress Bar */}
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-secondary">
                            <div
                                className={cn(
                                    "h-full rounded-full transition-all duration-500",
                                    goal.progressPercent === 100 ? "bg-accent-green" : "bg-accent-purple"
                                )}
                                style={{ width: `${goal.progressPercent}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Children */}
                <AnimatePresence>
                    {isExpanded && hasChildren && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-8 border-l-2 border-white/5 pl-6 pt-4"
                        >
                            {goal.subGoals?.map((subGoal) => (
                                <GoalNode
                                    key={subGoal.goalId}
                                    goal={subGoal}
                                    level={level + 1}
                                    onCreateSubGoal={onCreateSubGoal}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

interface GoalTreeProps {
    goals: Goal[];
    onCreateSubGoal: (parentId: string, parentType: Goal['goalType']) => void;
}

export const GoalTree = ({ goals, onCreateSubGoal }: GoalTreeProps) => {
    if (!goals?.length) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/10 p-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-bg-secondary">
                    <Target className="h-8 w-8 text-text-muted" />
                </div>
                <h3 className="font-display text-lg font-bold text-text-primary">No Goals Set</h3>
                <p className="text-text-muted">Start by creating a Life Goal to guide your journey.</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {goals.map((goal) => (
                <GoalNode
                    key={goal.goalId}
                    goal={goal}
                    onCreateSubGoal={onCreateSubGoal}
                />
            ))}
        </div>
    );
};
