import { ApiProperty } from '@nestjs/swagger'
import { ClientIncomeResponseEntity } from '../client.entity-dto'

export class CreateIncomeResponseDto {
	@ApiProperty({ type: ClientIncomeResponseEntity })
	client: ClientIncomeResponseEntity
}
