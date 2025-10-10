import { EventBus } from '@/shared/core/events/event-bus'
import { Module } from '@nestjs/common'
import { DomainEventsAdapter } from './domain-events.adapter'

@Module({
	providers: [{ provide: EventBus, useClass: DomainEventsAdapter }],
	exports: [EventBus],
})
export class EventsModule {}
