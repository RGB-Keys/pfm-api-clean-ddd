import { OutputCollectionDTO } from '@/shared/core/dtos/output-collection-dto'
import { Either, success } from '@/shared/core/errors/either/either'
import { SearchParams } from '@shared'
import { GoalSummaryDTO } from '../../dtos/goal.dto'
import { GoalRepository } from '../../repositories/goal.repository'

export type ListGoalUseCaseRequest = SearchParams<{
	clientId: string
	goalId: string
	startedAt: Date
	endedAt: Date
}>

export type ListGoalUseCaseResponse = Either<
	null,
	OutputCollectionDTO<GoalSummaryDTO>
>

export class ListGoalUseCase {
	constructor(private readonly goalRepository: GoalRepository) {}

	async execute(
		request: ListGoalUseCaseRequest,
	): Promise<ListGoalUseCaseResponse> {
		return success(await this.goalRepository.listSummary(request))
	}
}
