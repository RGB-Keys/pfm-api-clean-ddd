import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class SetMonthlyIncomeDto {
	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({ type: 'number', format: 'decimal' })
	amount: number
}
