import { ApiProperty } from '@nestjs/swagger'
import { IncomeBaseEntity } from '../income.entity-dto'

export class ListIncomesResponseDto {
	@ApiProperty({ type: IncomeBaseEntity, isArray: true })
	incomes: IncomeBaseEntity[]
}
