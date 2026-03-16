import { ApiProperty } from '@nestjs/swagger'
import { ExpenseBaseEntity } from '../expense.entity-dto'

export class GetExpenseResponseDto {
	@ApiProperty({ type: ExpenseBaseEntity })
	expense: ExpenseBaseEntity
}
