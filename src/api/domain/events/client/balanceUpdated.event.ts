import { UniqueEntityId } from '@/shared'
import { DomainEvent } from '@/shared/core/events/domain-event'
import { Money } from '../../entities/value-objects/money.value-object'

export class BalanceUpdatedEvent extends DomainEvent {
	public readonly occurredAt: Date = new Date()
	public readonly name = 'BalanceUpdatedEvent'

	constructor(
		public readonly clientId: UniqueEntityId,
		public readonly balance: Money,
	) {
		super()
	}

	getAggregateId(): UniqueEntityId {
		return this.clientId
	}
}
