import { IncomeSummaryDTO } from '@/api/application/dtos/income.dto'
import { CollectionPresenter, OutputCollectionDTO } from '@/shared'

export class IncomeCollectionPresenter extends CollectionPresenter<IncomeSummaryDTO> {
	constructor(dto: OutputCollectionDTO<IncomeSummaryDTO>) {
		super(dto.data, dto.meta)
	}
}
