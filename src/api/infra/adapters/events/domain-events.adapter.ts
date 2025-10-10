import { AggregateRoot, UniqueEntityId } from '@/shared'
import { Injectable } from '@nestjs/common'
import { DomainEvents } from '../../../../shared/core/events/domain-events'
import { EventBus } from '../../../../shared/core/events/event-bus'

@Injectable()
export class DomainEventsAdapter implements EventBus {
	markAggregateForDispatch(aggregate: AggregateRoot): void {
		DomainEvents.markAggregateForDispatch(aggregate)
	}

	dispatchEventsForAggregate(id: UniqueEntityId): void {
		DomainEvents.dispatchEventsForAggregate(id)
	}
}
