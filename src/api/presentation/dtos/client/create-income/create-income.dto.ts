import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsDate,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator'

export class CreateIncomeDto {
	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({ type: 'number' })
	amount: number

	@IsNotEmpty()
	@IsDate()
	@Type(() => Date)
	@ApiProperty({ type: 'string', format: 'date-time' })
	date: Date

	@IsOptional()
	@IsString()
	@ApiPropertyOptional({ type: 'string' })
	description?: string

	@IsOptional()
	@IsString()
	@ApiPropertyOptional({ type: 'string' })
	category?: string
}
