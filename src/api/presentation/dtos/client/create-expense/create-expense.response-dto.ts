import { ApiProperty } from '@nestjs/swagger'
import { ClientExpenseResponseEntity } from '../client.entity-dto'

export class CreateExpenseResponseDto {
	@ApiProperty({ type: ClientExpenseResponseEntity })
	client: ClientExpenseResponseEntity
}
