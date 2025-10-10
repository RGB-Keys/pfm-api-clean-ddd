import { GoalSummaryDTO } from '@/api/application/dtos/goal.dto'
import { Goal } from '@/api/domain/entities/goal.entity'
import { Money } from '@/api/domain/entities/value-objects/money.value-object'
import { UniqueEntityId } from '@/shared'
import { Goal as PrismaGoal } from '@prisma/client'

export class PrismaGoalMapper {
	static toDomain(persistence: PrismaGoal): Goal {
		return Goal.restore(
			{
				clientId: new UniqueEntityId(persistence.clientId),
				target: new Money(Number(persistence.target)),
				saved: new Money(Number(persistence.saved)),
				startedAt: persistence.startedAt,
				endedAt: persistence.endedAt ?? undefined,
				updatedAt: persistence.updatedAt ?? undefined,
			},
			new UniqueEntityId(persistence.id),
		)
	}
}

export function GoalSummarytoDTO(persistence: PrismaGoal): GoalSummaryDTO {
	return {
		id: new UniqueEntityId(persistence.id),
		clientId: new UniqueEntityId(persistence.clientId),
		target: new Money(Number(persistence.target)),
		saved: new Money(Number(persistence.saved)),
		startedAt: persistence.startedAt,
		endedAt: persistence.endedAt ?? undefined,
		updatedAt: persistence.updatedAt ?? undefined,
	}
}
