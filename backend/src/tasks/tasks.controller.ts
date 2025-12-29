import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    findAll(@Request() req) {
        return this.tasksService.findAll(req.user.userId);
    }

    @Get('today')
    findToday(@Request() req) {
        return this.tasksService.findToday(req.user.userId);
    }

    @Get('inbox')
    findInbox(@Request() req) {
        return this.tasksService.findInbox(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.tasksService.findOne(id, req.user.userId);
    }

    @Post()
    create(@Request() req, @Body() data: Prisma.TaskCreateInput) {
        return this.tasksService.create({ ...data, user: { connect: { userId: req.user.userId } } });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Prisma.TaskUpdateInput) {
        return this.tasksService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tasksService.remove(id);
    }
}
