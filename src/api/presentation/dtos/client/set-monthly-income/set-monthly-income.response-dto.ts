import { ApiProperty } from '@nestjs/swagger'
import { ClientMonthlyIncomeResponseEntity } from '../client.entity-dto'

export class SetMonthlyIncomeResponseDto {
	@ApiProperty({ type: ClientMonthlyIncomeResponseEntity })
	client: ClientMonthlyIncomeResponseEntity
}
