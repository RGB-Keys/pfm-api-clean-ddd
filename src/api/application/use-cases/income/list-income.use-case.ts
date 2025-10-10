import { OutputCollectionDTO } from '@/shared/core/dtos/output-collection-dto'
import { Either, success } from '@/shared/core/errors/either/either'
import { SearchParams } from '@shared'
import { IncomeSummaryDTO } from '../../dtos/income.dto'
import { IncomeRepository } from '../../repositories/income.repository'

export type ListIncomeUseCaseRequest = SearchParams<{
	clientId: string
	date: Date
	category?: string | null
}>

export type ListIncomeUseCaseResponse = Either<
	null,
	OutputCollectionDTO<IncomeSummaryDTO>
>

export class ListIncomeUseCase {
	constructor(private readonly incomeRepository: IncomeRepository) {}

	async execute(
		request: ListIncomeUseCaseRequest,
	): Promise<ListIncomeUseCaseResponse> {
		return success(await this.incomeRepository.listSummary(request))
	}
}
