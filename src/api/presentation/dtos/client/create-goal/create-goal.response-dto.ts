import { ApiProperty } from '@nestjs/swagger'
import { ClientGoalResponseEntity } from '../client.entity-dto'

export class CreateGoalResponseDto {
	@ApiProperty({ type: ClientGoalResponseEntity })
	client: ClientGoalResponseEntity
}
