import { ClientRepository } from '@/api/application/repositories/client.repository'
import { GoalRepository } from '@/api/application/repositories/goal.repository'
import { GetGoalUseCase } from '@/api/application/use-cases/goal/get-goal.use-case'
import { ListGoalUseCase } from '@/api/application/use-cases/goal/list-goal.use-case'
import { Provider } from '@nestjs/common'

export const GoalAdapter: Provider[] = [
	{
		provide: GetGoalUseCase,
		useFactory: (
			clientRepository: ClientRepository,
			goalRepository: GoalRepository,
		) => new GetGoalUseCase(clientRepository, goalRepository),
		inject: [ClientRepository, GoalRepository],
	},
	{
		provide: ListGoalUseCase,
		useFactory: (goalRepository: GoalRepository) =>
			new ListGoalUseCase(goalRepository),
		inject: [GoalRepository],
	},
]
