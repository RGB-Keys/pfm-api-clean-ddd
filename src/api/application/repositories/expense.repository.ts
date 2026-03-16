import { Expense } from '@/api/domain/entities/expense.entity'
import { OutputCollectionDTO } from '@/shared/core/dtos/output-collection-dto'
import { SearchParams } from '@shared'
import { ExpenseSummaryDTO } from '../dtos/expense.dto'

export abstract class ExpenseRepository {
	abstract findUnique(params: FindUniqueExpenseParams): Promise<Expense | null>
	abstract listSummary(
		params?: SearchParams<ExpenseSearchableFields>,
	): Promise<OutputCollectionDTO<ExpenseSummaryDTO>>
}

export interface FindUniqueExpenseParams {
	expenseId?: string
}

export interface ExpenseSearchableFields {
	clientId: string
	expenseId: string
	date: Date
	category: string
}
