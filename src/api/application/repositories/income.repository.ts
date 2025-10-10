import { Income } from '@/api/domain/entities/income.entity'
import { OutputCollectionDTO } from '@/shared/core/dtos/output-collection-dto'
import { SearchParams } from '@shared'
import { IncomeSummaryDTO } from '../dtos/income.dto'

export abstract class IncomeRepository {
	abstract findUnique(params: FindUniqueIncomeParams): Promise<Income | null>
	abstract listSummary(
		params?: SearchParams<IncomeSearchableFields>,
	): Promise<OutputCollectionDTO<IncomeSummaryDTO>>
}

export interface FindUniqueIncomeParams {
	incomeId?: string
}

export interface IncomeSearchableFields {
	clientId: string
	amount: number
	date: Date
	description?: string | null
	category?: string | null
}
