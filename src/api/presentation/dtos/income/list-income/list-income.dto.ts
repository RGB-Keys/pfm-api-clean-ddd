import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsDate,
	IsInt,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator'

export class ListIncomesDto {
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
	incomeId?: string

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	@ApiPropertyOptional({
		type: 'string',
		format: 'date-time',
	})
	date?: Date

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	@ApiPropertyOptional({ type: 'number' })
	amount?: number

	@IsOptional()
	@IsString()
	@ApiPropertyOptional({ type: 'string', format: 'uuid' })
	category?: string
}
