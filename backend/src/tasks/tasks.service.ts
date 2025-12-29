import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }

    async findAll(userId: string) {
        return this.prisma.task.findMany({
            where: { userId },
            orderBy: { scheduledFor: 'asc' }
        });
    }

    async findToday(userId: string) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return this.prisma.task.findMany({
            where: {
                userId,
                scheduledFor: {
                    gte: today,
                    lt: tomorrow
                }
            },
            include: { goal: true }
        });
    }

    async findInbox(userId: string) {
        return this.prisma.task.findMany({
            where: { userId, goalId: null },
            orderBy: { createdAt: 'desc' }
        })
    }

    async findOne(id: string, userId: string) {
        return this.prisma.task.findFirst({
            where: { taskId: id, userId }
        })
    }

    async create(data: Prisma.TaskCreateInput) {
        return this.prisma.task.create({ data });
    }

    async update(id: string, data: Prisma.TaskUpdateInput) {
        return this.prisma.task.update({
            where: { taskId: id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.task.delete({
            where: { taskId: id },
        });
    }
}
