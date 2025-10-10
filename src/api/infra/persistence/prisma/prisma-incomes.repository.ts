import { IncomeSummaryDTO } from '@/api/application/dtos/income.dto'
import {
	FindUniqueIncomeParams,
	IncomeRepository,
	IncomeSearchableFields,
} from '@/api/application/repositories/income.repository'
import { Income } from '@/api/domain/entities/income.entity'
import { OutputCollectionDTO, PrismaService, SearchParams } from '@/shared'
import { Injectable } from '@nestjs/common'
import {
	IncomeSummarytoDTO,
	PrismaIncomeMapper,
} from '../mappers/prisma-income.mapper'

@Injectable()
export class PrismaIncomeRepository implements IncomeRepository {
	constructor(private prisma: PrismaService) {}

	async findUnique({
		incomeId,
	}: FindUniqueIncomeParams): Promise<Income | null> {
		const income = await this.prisma.income.findUnique({
			where: { id: incomeId },
		})

		if (!income) return null

		return PrismaIncomeMapper.toDomain(income)
	}

	async listSummary(
		params?: SearchParams<IncomeSearchableFields>,
	): Promise<OutputCollectionDTO<IncomeSummaryDTO>> {
		const [data, meta] = await this.prisma.extendedClient.income.paginate({
			where: params?.filters,
			orderBy: params?.pagination.sortFild && {
				[params.pagination.sortFild]: params.pagination.sortDir,
			},
			offset: {
				page: params?.pagination.page,
				perPage: params?.pagination.perPage,
			},
		})

		return {
			data: data.map(IncomeSummarytoDTO),
			meta,
		}
	}
}
