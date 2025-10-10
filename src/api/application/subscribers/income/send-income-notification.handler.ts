import { DomainEvents } from '@/shared/core/events/domain-events'
import { EventHandler } from '@/shared/core/events/event-handler'
import { IncomeAddedEvent } from '../../../domain/events/income/income-added.event'

export class SendIncomeNotificationHandler implements EventHandler {
	setupSubscriptions(): void {
		DomainEvents.register(this.handle.bind(this), IncomeAddedEvent.name)
	}

	private handle(event: IncomeAddedEvent): void {
		console.log(
			`[NOTIFICATION] Client ${event.clientId.toString()} recebeu uma nova receita de R$${event.amount}`,
		)
	}
}
