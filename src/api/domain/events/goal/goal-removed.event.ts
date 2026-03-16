import { UniqueEntityId } from '@/shared'
import { DomainEvent } from '@/shared/core/events/domain-event'

export class GoalRemovedEvent extends DomainEvent {
	public occurredAt: Date
	public name = 'GoalRemovedEvent'

	constructor(
		public readonly goalId: UniqueEntityId,
		public readonly clientId: UniqueEntityId,
	) {
		super()
		this.occurredAt = new Date()
	}

	getAggregateId(): UniqueEntityId {
		return this.clientId
	}
}
