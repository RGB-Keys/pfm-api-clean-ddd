import { ApiProperty } from '@nestjs/swagger'
import { ClientResponseEntity } from '../../client/client.entity-dto'

export class RegisterClientResponseDto {
	@ApiProperty({ type: ClientResponseEntity })
	client: ClientResponseEntity
}
