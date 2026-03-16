import { ApiProperty } from '@nestjs/swagger'
import { GoalBaseEntity } from '../goal.entity-dto'

export class GetGoalResponseDto {
	@ApiProperty({ type: GoalBaseEntity })
	goal: GoalBaseEntity
}
