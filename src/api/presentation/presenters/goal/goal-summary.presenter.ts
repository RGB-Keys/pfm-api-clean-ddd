import { Goal } from '@/api/domain/entities/goal.entity'

export class GoalSummaryPresenter {
	static toHttp(goal: Goal) {
		return {
			id: goal.id.toString(),
			clientId: goal.clientId.toString(),
			target: goal.target.value.parsedAmount,
			saved: goal.saved.value.parsedAmount,
			startedAt: goal.startedAt,
			endedAt: goal.endedAt ?? undefined,
			updatedAt: goal.updatedAt ?? undefined,
		}
	}

	static toHttpList(goals: Goal[]) {
		return goals.map((goal) => this.toHttp(goal))
	}
}
