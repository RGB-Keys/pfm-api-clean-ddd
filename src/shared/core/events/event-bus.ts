import { JOBS } from '@/shared'
import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/value-objects/unique-entity-id'

export abstract class EventBus {
	abstract markAggregateForDispatch(aggregate: AggregateRoot): void
	abstract dispatchEventsForAggregate(id: UniqueEntityId): void
	abstract emit<K extends keyof EventPayloads>(
		event: K,
		payload: EventPayloads[K],
	): void
}

export interface EventPayloads {
	[JOBS.BALANCE]: {
		clientId: string
	}
}
