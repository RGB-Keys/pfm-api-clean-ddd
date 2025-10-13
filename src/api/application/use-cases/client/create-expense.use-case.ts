import { ClientNotFoundError } from '@/api/core/errors/domain/client/client-not-found-error'
import { Expense } from '@/api/domain/entities/expense.entity'
import { Category } from '@/api/domain/entities/value-objects/category.value-object'
import { Money } from '@/api/domain/entities/value-objects/money.value-object'
import { UniqueEntityId } from '@/shared'
import { Either, fail, success } from '@/shared/core/errors/either/either'
import { EventBus } from '@/shared/core/events/event-bus'
import { ClientRepository } from '../../repositories/client.repository'

interface CreateExpenseUseCaseRequest {
	clientId: string
	amount: number
	date: Date
	description?: string
	category?: string
}

type CreateExpenseUseCaseResponse = Either<
	ClientNotFoundError,
	{
		expense: Expense
	}
>

export class CreateExpenseUseCase {
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
	}: CreateExpenseUseCaseRequest): Promise<CreateExpenseUseCaseResponse> {
		const client = await this.clientRepository.findUnique({ clientId })

		if (!client) return fail(new ClientNotFoundError())

		const expense = Expense.create({
			clientId: new UniqueEntityId(client.id.toString()),
			amount: new Money(amount),
			category: category ? new Category(category) : undefined,
			date,
			description,
		})

		client.addExpense(expense)
		this.eventBus.dispatchEventsForAggregate(client.id as UniqueEntityId)
		await this.clientRepository.save(client)

		return success({ expense })
	}
}
