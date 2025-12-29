import { EnergyLevel, GoalType, PrismaClient, TaskPriority, TaskStatus } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding database...');

    // 1. Create User
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.upsert({
        where: { email: 'wizard@guardian.gg' },
        update: {},
        create: {
            email: 'wizard@guardian.gg',
            firstName: 'Huzaifa',
            lastName: 'Wizard',
            password: hashedPassword,
        },
    });

    console.log(`Created user: ${user.firstName}`);

    // 2. Create Life Goal
    const lifeGoal = await prisma.goal.create({
        data: {
            title: 'Become a Thought Leader in AI',
            description: 'Establish a legacy in the field of Artificial Intelligence.',
            goalType: GoalType.LIFE,
            userId: user.userId,
            progressPercent: 35,
        },
    });

    // 3. Create Yearly Goal
    const yearlyGoal = await prisma.goal.create({
        data: {
            title: "Master's in Computer Science",
            description: 'Complete the degree with a focus on Agentic Systems.',
            goalType: GoalType.YEARLY,
            dueDate: new Date('2025-12-31'),
            userId: user.userId,
            parentGoalId: lifeGoal.goalId,
            progressPercent: 60,
        },
    });

    // 4. Create Monthly Goal
    const monthlyGoal = await prisma.goal.create({
        data: {
            title: 'Finish Linear Algebra & Optimization',
            goalType: GoalType.MONTHLY,
            dueDate: new Date('2025-01-31'),
            userId: user.userId,
            parentGoalId: yearlyGoal.goalId,
            progressPercent: 40,
        },
    });

    // 5. Create Weekly Goal
    const weeklyGoal = await prisma.goal.create({
        data: {
            title: 'Complete Chapter 1-3 of LA Textbook',
            goalType: GoalType.WEEKLY,
            userId: user.userId,
            parentGoalId: monthlyGoal.goalId,
            progressPercent: 20,
        },
    });

    // 6. Create Tasks linked to Weekly Goal
    await prisma.task.createMany({
        data: [
            {
                title: 'Read Chapter 1 of Linear Algebra',
                taskStatus: TaskStatus.TODO,
                taskPriority: TaskPriority.P1_URGENT,
                energyLevel: EnergyLevel.HIGH_FOCUS,
                estimatedMinutes: 45,
                scheduledFor: new Date(), // Today
                goalId: weeklyGoal.goalId,
                userId: user.userId,
            },
            {
                title: 'Solve Exercise 1.1',
                taskStatus: TaskStatus.TODO,
                taskPriority: TaskPriority.P2_HIGH,
                energyLevel: EnergyLevel.MEDIUM,
                estimatedMinutes: 30,
                goalId: weeklyGoal.goalId,
                userId: user.userId,
            },
        ],
    });

    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
        console.log('done')
    });
