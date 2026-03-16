import { ExpenseSummaryDTO } from '@/api/application/dtos/expense.dto'
import {
	ExpenseRepository,
	ExpenseSearchableFields,
	FindUniqueExpenseParams,
} from '@/api/application/repositories/expense.repository'
import { Expense } from '@/api/domain/entities/expense.entity'
import {
	OutputCollectionDTO,
	PrismaExtendedClient,
	PrismaService,
	SearchParams,
} from '@/shared'
import { Injectable } from '@nestjs/common'
import {
	ExpenseSummarytoDTO,
	PrismaExpenseMapper,
} from '../mappers/prisma-expense.mapper'

@Injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
	private readonly db: PrismaExtendedClient

	constructor(private prisma: PrismaService) {
		this.db = prisma.getClient()
	}

	async findUnique({
		expenseId,
	}: FindUniqueExpenseParams): Promise<Expense | null> {
		const expense = await this.db.expense.findUnique({
			where: { id: expenseId },
		})

		if (!expense) return null

		return PrismaExpenseMapper.toDomain(expense)
	}

	async listSummary(
		params: SearchParams<ExpenseSearchableFields>,
	): Promise<OutputCollectionDTO<ExpenseSummaryDTO>> {
		const [data, meta] = await this.db.expense.paginate({
			where: {
				clientId: params.filters?.clientId,
				id: params.filters?.expenseId,
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
			data: data.map(ExpenseSummarytoDTO),
			meta,
		}
	}
}
