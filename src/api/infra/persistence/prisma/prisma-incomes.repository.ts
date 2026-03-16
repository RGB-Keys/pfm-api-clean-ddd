import { IncomeSummaryDTO } from '@/api/application/dtos/income.dto'
import {
	FindUniqueIncomeParams,
	IncomeRepository,
	IncomeSearchableFields,
} from '@/api/application/repositories/income.repository'
import { Income } from '@/api/domain/entities/income.entity'
import {
	OutputCollectionDTO,
	PrismaExtendedClient,
	PrismaService,
	SearchParams,
} from '@/shared'
import { Injectable } from '@nestjs/common'
import {
	IncomeSummarytoDTO,
	PrismaIncomeMapper,
} from '../mappers/prisma-income.mapper'

@Injectable()
export class PrismaIncomeRepository implements IncomeRepository {
	private readonly db: PrismaExtendedClient

	constructor(private prisma: PrismaService) {
		this.db = prisma.getClient()
	}

	async findUnique({
		incomeId,
	}: FindUniqueIncomeParams): Promise<Income | null> {
		const income = await this.db.income.findUnique({
			where: { id: incomeId },
		})

		if (!income) return null

		return PrismaIncomeMapper.toDomain(income)
	}

	async listSummary(
		params: SearchParams<IncomeSearchableFields>,
	): Promise<OutputCollectionDTO<IncomeSummaryDTO>> {
		const [data, meta] = await this.db.income.paginate({
			where: {
				clientId: params.filters?.clientId,
				id: params.filters?.incomeId,
				category: params.filters?.category,
				date: params.filters?.date,
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
			data: data.map(IncomeSummarytoDTO),
			meta,
		}
	}
}
