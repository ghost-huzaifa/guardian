import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GoalsService {
    constructor(private prisma: PrismaService) { }

    async findAll(userId: string) {
        return this.prisma.goal.findMany({
            where: {
                userId,
                parentGoalId: null // Fetch top-level goals first
            },
            include: {
                subGoals: {
                    include: {
                        subGoals: {
                            include: {
                                subGoals: true // 3 levels depth
                            }
                        }
                    }
                },
                tasks: true
            },
            orderBy: { orderNo: 'asc' }
        });
    }

    async findOne(id: string, userId: string) {
        return this.prisma.goal.findFirst({
            where: { goalId: id, userId },
            include: { subGoals: true, tasks: true }
        })
    }

    async create(data: Prisma.GoalCreateInput) {
        return this.prisma.goal.create({ data });
    }

    async update(id: string, data: Prisma.GoalUpdateInput) {
        return this.prisma.goal.update({
            where: { goalId: id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.goal.delete({
            where: { goalId: id },
        });
    }
}
