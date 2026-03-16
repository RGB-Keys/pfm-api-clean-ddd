import { WatchedList } from '@shared'
import { Goal } from '../goal.entity'

export class GoalList extends WatchedList<Goal> {
	protected compareItems(a: Goal, b: Goal): boolean {
		return a.id.equals(b.id)
	}
}
