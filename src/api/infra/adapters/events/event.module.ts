import { QUEUES } from '@/shared'
import { EventBus } from '@/shared/core/events/event-bus'
import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { DomainEventsAdapter } from './domain-events.adapter'

@Module({
	imports: [
		BullModule.registerQueue({
			name: QUEUES.SELECTION_PROCESS,
		}),
	],
	providers: [{ provide: EventBus, useClass: DomainEventsAdapter }],
	exports: [EventBus],
})
export class EventsModule {}
