// /queue/subscribers/balance-events.subscriber.ts
import { JOBS, QUEUES } from '@/shared'
import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter' // Se usar o EventEmitter do NestJS
import { Queue } from 'bullmq'

@Injectable()
export class BalanceEventsSubscriber {
	constructor(
		@InjectQueue(QUEUES.SELECTION_PROCESS)
		private readonly financialQueue: Queue,
	) {}

	// Este método "escuta" o evento emitido pelo EventBus
	// A implementação exata depende do seu EventBus (NestJS, RabbitMQ, etc.)
	@OnEvent(JOBS.BALANCE)
	async handleBalanceUpdateNeeded(payload: { clientId: string }) {
		console.log(`Event ${JOBS.BALANCE} received. Adding job to queue...`)

		// Adiciona o job na fila do BullMQ
		await this.financialQueue.add(JOBS.BALANCE, payload)
	}
}
