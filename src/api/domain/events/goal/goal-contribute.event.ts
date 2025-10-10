import { UniqueEntityId } from '@/shared'
import { DomainEvent } from '@/shared/core/events/domain-event'
import { Money } from '../../entities/value-objects/money.value-object'

export class GoalContributedEvent extends DomainEvent {
	public occurredAt: Date
	public name = 'GoalContributedEvent'

	constructor(
		public readonly goalId: UniqueEntityId,
		public readonly clientId: UniqueEntityId,
		public readonly contributedAmount: Money,
	) {
		super()
		this.occurredAt = new Date()
	}

	getAggregateId(): UniqueEntityId {
		return this.clientId
	}
}
