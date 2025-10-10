import { Money } from '@/api/domain/entities/value-objects/money.value-object'
import { UniqueEntityId } from '@/shared'
import { DomainEvent } from '@/shared/core/events/domain-event'

export class GoalReachedEvent extends DomainEvent {
	public occurredAt: Date
	public name = 'GoalReachedEvent'

	constructor(
		public readonly goalId: UniqueEntityId,
		public readonly clientId: UniqueEntityId,
		public readonly target: Money,
	) {
		super()
		this.occurredAt = new Date()
	}

	getAggregateId(): UniqueEntityId {
		return this.clientId
	}
}
