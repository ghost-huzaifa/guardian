export interface Task {
    taskId: string;
    title: string;
    description?: string;
    taskStatus: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
    taskPriority: 'P1_URGENT' | 'P2_HIGH' | 'P3_MEDIUM' | 'P4_LOW';
    energyLevel: 'HIGH_FOCUS' | 'MEDIUM' | 'LOW_ENERGY';
    estimatedMinutes?: number;
    isCompleted?: boolean; // Derived or mapped
    goalId?: string;
}

export interface Goal {
    goalId: string;
    title: string;
    description?: string;
    goalType: 'LIFE' | 'YEARLY' | 'MONTHLY' | 'WEEKLY' | 'ISOLATED';
    progressPercent: number;
    isCompleted: boolean;
    dueDate?: string;
    subGoals?: Goal[];
    tasks?: Task[];
}
