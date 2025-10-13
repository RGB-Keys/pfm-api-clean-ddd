import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsInt, IsOptional, IsUUID } from 'class-validator'

export class ListGoalsDto {
	@IsOptional()
	@IsInt()
	@Type(() => Number)
	@ApiPropertyOptional({ type: 'number' })
	page?: number

	@IsOptional()
	@IsInt()
	@Type(() => Number)
	@ApiPropertyOptional({ type: 'number' })
	limit?: number

	@IsOptional()
	@IsUUID()
	@ApiPropertyOptional({ type: 'string', format: 'uuid' })
	goalId?: string

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	@ApiPropertyOptional({
		type: 'string',
		format: 'date-time',
	})
	startedAt?: Date

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	@ApiPropertyOptional({
		type: 'string',
		format: 'date-time',
	})
	endedAt?: Date
}
