import { Income } from '@/api/domain/entities/income.entity'
import { OutputCollectionDTO } from '@/shared/core/dtos/output-collection-dto'
import { SearchParams } from '@shared'
import { ExpenseSummaryDTO } from '../dtos/expense.dto'

export abstract class IncomeRepository {
	abstract findUnique(params: FindUniqueIncomeParams): Promise<Income | null>
	abstract listSummary(
		params?: SearchParams<ExpenseSearchableFields>,
	): Promise<OutputCollectionDTO<ExpenseSummaryDTO>>
}

export interface FindUniqueIncomeParams {
	incomeId?: string
}

export interface ExpenseSearchableFields {
	clientId: string
	amount: number
	date: Date
	description?: string | null
	category?: string | null
}
