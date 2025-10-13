import { ExpenseSummaryDTO } from '@/api/application/dtos/expense.dto'
import { CollectionPresenter, OutputCollectionDTO } from '@/shared'

export class ExpenseCollectionPresenter extends CollectionPresenter<ExpenseSummaryDTO> {
	constructor(dto: OutputCollectionDTO<ExpenseSummaryDTO>) {
		super(dto.data, dto.meta)
	}
}
