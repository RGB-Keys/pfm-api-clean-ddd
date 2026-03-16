import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class CreateGoalDto {
	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({ type: 'number' })
	target: number

	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({ type: 'number' })
	saved: number

	@IsNotEmpty()
	@IsDate()
	@Type(() => Date)
	@ApiProperty({ type: 'string', format: 'date-time' })
	startedAt: Date

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	@ApiPropertyOptional({ type: 'string', format: 'date-time' })
	endedAt: Date
}
