import { GoalSummaryDTO } from '@/api/application/dtos/goal.dto'
import {
	FindUniqueGoalParams,
	GoalRepository,
	GoalSearchableFields,
} from '@/api/application/repositories/goal.repository'
import { Goal } from '@/api/domain/entities/goal.entity'
import {
	OutputCollectionDTO,
	PrismaExtendedClient,
	PrismaService,
	SearchParams,
} from '@/shared'
import { Injectable } from '@nestjs/common'
import {
	GoalSummarytoDTO,
	PrismaGoalMapper,
} from '../mappers/prisma-goal.mapper'

@Injectable()
export class PrismaGoalRepository implements GoalRepository {
	private readonly db: PrismaExtendedClient

	constructor(private prisma: PrismaService) {
		this.db = prisma.getClient()
	}

	async findUnique({ goalId }: FindUniqueGoalParams): Promise<Goal | null> {
		const goal = await this.db.goal.findUnique({
			where: { id: goalId },
		})

		if (!goal) return null

		return PrismaGoalMapper.toDomain(goal)
	}

	async listSummary(
		params: SearchParams<GoalSearchableFields>,
	): Promise<OutputCollectionDTO<GoalSummaryDTO>> {
		const [data, meta] = await this.db.goal.paginate({
			where: {
				id: params.filters?.goalId,
				clientId: params.filters?.clientId,
				startedAt: params.filters?.startedAt,
				endedAt: params.filters?.endedAt,
			},
			orderBy: params.pagination.sortFild && {
				[params.pagination.sortFild]: params.pagination.sortDir,
			},
			offset: {
				page: params.pagination.page,
				perPage: params.pagination.perPage,
			},
		})

		return {
			data: data.map(GoalSummarytoDTO),
			meta,
		}
	}
}
