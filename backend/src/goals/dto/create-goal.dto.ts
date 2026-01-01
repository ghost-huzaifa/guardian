import { IsString, IsInt, IsBoolean, IsEnum, IsOptional, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GoalType } from '@prisma/client';

export class CreateGoalDto {
    @ApiPropertyOptional({ description: 'Order number for sorting', default: 0 })
    @IsInt()
    @IsOptional()
    orderNo?: number;

    @ApiProperty({ description: 'The title of the goal' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: 'Detailed description of the goal' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ enum: GoalType, default: GoalType.ISOLATED })
    @IsEnum(GoalType)
    @IsOptional()
    goalType?: GoalType;

    @ApiPropertyOptional({ default: false })
    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;

    @ApiPropertyOptional({ description: 'Progress percentage (0-100)', default: 0 })
    @IsInt()
    @IsOptional()
    progressPercent?: number;

    @ApiPropertyOptional({ description: 'The date when the goal is due' })
    @IsDateString()
    @IsOptional()
    dueDate?: string;

    @ApiPropertyOptional({ description: 'The ID of the parent goal if this is a sub-goal' })
    @IsUUID()
    @IsOptional()
    parentGoalId?: string;
}
