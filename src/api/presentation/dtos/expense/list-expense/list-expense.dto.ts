import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class ListExpensesDto {
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
	expenseId?: string

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	@ApiPropertyOptional({
		type: 'string',
		format: 'date-time',
	})
	date?: Date

	@IsOptional()
	@IsString()
	@ApiPropertyOptional({ type: 'string', format: 'uuid' })
	category?: string
}
