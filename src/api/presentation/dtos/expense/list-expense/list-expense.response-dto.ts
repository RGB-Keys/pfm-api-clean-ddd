import { ApiProperty } from '@nestjs/swagger'
import { ExpenseBaseEntity } from '../expense.entity-dto'

export class ListExpensesResponseDto {
	@ApiProperty({ type: ExpenseBaseEntity, isArray: true })
	expenses: ExpenseBaseEntity[]
}
