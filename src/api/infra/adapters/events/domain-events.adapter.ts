// /infra/events/domain-events.adapter.ts (Corrigido)
import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import {
	AggregateRoot,
	DomainEvents,
	EventBus,
	EventPayloads,
	JOBS, // Supondo que JOBS.BALANCE é um dos eventos
	QUEUES,
	UniqueEntityId,
} from '@shared'
import { Queue } from 'bullmq'
import { randomUUID } from 'node:crypto' // Para gerar IDs únicos

@Injectable()
export class DomainEventsAdapter implements EventBus {
	private readonly logger = new Logger(DomainEventsAdapter.name)

	constructor(
		// 👇 Renomeie a fila para algo mais genérico!
		@InjectQueue(QUEUES.SELECTION_PROCESS) private readonly queue: Queue,
	) {}

	// ✅ DESCOMENTE E IMPLEMENTE ESTE MÉTODO!
	async emit<K extends keyof EventPayloads>(
		event: K,
		payload: EventPayloads[K],
	) {
		const jobId = `${String(event)}_${randomUUID()}`
		this.logger.log(`Enfileirando evento: ${String(event)} com jobId: ${jobId}`)

		// O primeiro argumento de 'add' é o NOME do job, o segundo são os DADOS.
		// É importante diferenciá-los para o seu @Processor.
		await this.queue.add(String(event), payload, {
			jobId, // Evita duplicatas em caso de retentativas
		})
	}

	markAggregateForDispatch(aggregate: AggregateRoot): void {
		DomainEvents.markAggregateForDispatch(aggregate)
	}

	dispatchEventsForAggregate(id: UniqueEntityId): void {
		// Esta parte é para um padrão DDD mais avançado.
		// Se você não o estiver usando ativamente, pode até removê-la por enquanto.
		DomainEvents.dispatchEventsForAggregate(id)
	}

	@OnEvent(JOBS.BALANCE)
	async handleBalanceUpdateNeeded(payload: { clientId: string }) {
		console.log(`Event ${JOBS.BALANCE} received. Adding job to queue...`)

		// Adiciona o job na fila do BullMQ
		await this.queue.add(JOBS.BALANCE, payload)
	}
}
