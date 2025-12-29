import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';

@Controller('goals')
@UseGuards(AuthGuard('jwt'))
export class GoalsController {
    constructor(private readonly goalsService: GoalsService) { }

    @Get()
    findAll(@Request() req) {
        return this.goalsService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.goalsService.findOne(id, req.user.userId);
    }

    @Post()
    create(@Request() req, @Body() data: Prisma.GoalCreateInput) {
        return this.goalsService.create({ ...data, user: { connect: { userId: req.user.userId } } });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Prisma.GoalUpdateInput) {
        return this.goalsService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.goalsService.remove(id);
    }
}
