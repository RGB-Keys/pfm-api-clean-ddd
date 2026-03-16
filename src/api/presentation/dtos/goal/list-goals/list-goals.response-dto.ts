import { ApiProperty } from '@nestjs/swagger'
import { GoalBaseEntity } from '../goal.entity-dto'

export class ListGoalsResponseDto {
	@ApiProperty({ type: GoalBaseEntity, isArray: true })
	goals: GoalBaseEntity[]
}
