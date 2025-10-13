import { OutputCollectionDTO } from '@/shared/core/dtos/output-collection-dto'
import { Either, success } from '@/shared/core/errors/either/either'
import { SearchParams } from '@shared'
import { ExpenseSummaryDTO } from '../../dtos/expense.dto'
import { ExpenseRepository } from '../../repositories/expense.repository'

export type ListExpenseUseCaseRequest = SearchParams<{
	clientId: string
	expenseId: string
	date: Date
	category: string
}>

export type ListExpenseUseCaseResponse = Either<
	null,
	OutputCollectionDTO<ExpenseSummaryDTO>
>

export class ListExpenseUseCase {
	constructor(private readonly expenseRepository: ExpenseRepository) {}

	async execute(
		request: ListExpenseUseCaseRequest,
	): Promise<ListExpenseUseCaseResponse> {
		return success(await this.expenseRepository.listSummary(request))
	}
}
