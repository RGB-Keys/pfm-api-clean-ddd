import { ApiProperty } from '@nestjs/swagger'
import { IncomeBaseEntity } from '../income.entity-dto'

export class GetIncomeResponseDto {
	@ApiProperty({ type: IncomeBaseEntity })
	income: IncomeBaseEntity
}
