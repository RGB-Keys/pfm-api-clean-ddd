import { UniqueEntityId } from '@/shared'
import { DomainEvent } from '@/shared/core/events/domain-event'

export class IncomeRemovedEvent extends DomainEvent {
	public occurredAt: Date
	public name = 'IncomeRemovedEvent'

	constructor(
		public readonly incomeId: UniqueEntityId,
		public readonly clientId: UniqueEntityId,
	) {
		super()
		this.occurredAt = new Date()
	}

	getAggregateId(): UniqueEntityId {
		return this.clientId
	}
}
