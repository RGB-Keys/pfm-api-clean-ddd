import { ClientNotFoundError } from '@/api/core/errors/domain/client/client-not-found-error'
import { Income } from '@/api/domain/entities/income.entity'
import { Category } from '@/api/domain/entities/value-objects/category.value-object'
import { Money } from '@/api/domain/entities/value-objects/money.value-object'
import { JOBS, UniqueEntityId } from '@/shared'
import { Either, fail, success } from '@/shared/core/errors/either/either'
import { EventBus } from '@/shared/core/events/event-bus'
import { ClientRepository } from '../../repositories/client.repository'

interface CreateIncomeUseCaseRequest {
	clientId: string
	amount: number
	date: Date
	description?: string
	category?: string
}

type CreateIncomeUseCaseResponse = Either<
	ClientNotFoundError,
	{
		income: Income
	}
>

export class CreateIncomeUseCase {
	constructor(
		private readonly clientRepository: ClientRepository,
		private readonly eventBus: EventBus,
	) {}

	async execute({
		clientId,
		amount,
		category,
		date,
		description,
	}: CreateIncomeUseCaseRequest): Promise<CreateIncomeUseCaseResponse> {
		const client = await this.clientRepository.findUnique({ clientId })

		if (!client) return fail(new ClientNotFoundError())

		const income = Income.create({
			clientId: new UniqueEntityId(clientId),
			amount: new Money(amount),
			category: category ? new Category(category) : undefined,
			date,
			description,
		})

		client.addIncome(income)
		this.eventBus.dispatchEventsForAggregate(client.id as UniqueEntityId)
		this.eventBus.emit(JOBS.BALANCE, { clientId })
		await this.clientRepository.save(client)

		return success({ income })
	}
}
