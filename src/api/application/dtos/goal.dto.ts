import { Goal } from '@/api/domain/entities/goal.entity'

export class GoalSummaryDTO {
	id!: Goal['id']
	clientId!: Goal['clientId']
	target!: Goal['target']
	saved!: Goal['saved']
	startedAt!: Goal['startedAt']
	endedAt?: Goal['endedAt']
	updatedAt?: Goal['updatedAt']
}
