import { UniqueEntityId } from '@/shared'
import { DomainEvent } from '@/shared/core/events/domain-event'

export class ExpenseRemovedEvent extends DomainEvent {
	public occurredAt: Date
	public name = 'ExpenseRemovedEvent'

	constructor(
		public readonly expenseId: UniqueEntityId,
		public readonly clientId: UniqueEntityId,
	) {
		super()
		this.occurredAt = new Date()
	}

	getAggregateId(): UniqueEntityId {
		return this.clientId
	}
}
