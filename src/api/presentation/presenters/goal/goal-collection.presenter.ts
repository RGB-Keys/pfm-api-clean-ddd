import { GoalSummaryDTO } from '@/api/application/dtos/goal.dto'
import { CollectionPresenter, OutputCollectionDTO } from '@/shared'

export class GoalCollectionPresenter extends CollectionPresenter<GoalSummaryDTO> {
	constructor(dto: OutputCollectionDTO<GoalSummaryDTO>) {
		super(dto.data, dto.meta)
	}
}
