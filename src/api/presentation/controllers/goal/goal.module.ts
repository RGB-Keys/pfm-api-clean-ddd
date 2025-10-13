import { AdaptersModule } from '@/api/infra/adapters/adapters.module'
import { ApiPersistenceModule } from '@/api/infra/persistence/api-persistence.module'
import { EnvModule } from '@/shared'
import { Module } from '@nestjs/common'
import { GetGoalController } from './get-goal/get-goal.controller'
import { ListGoalsController } from './list-goal/list-goal.controller'

@Module({
	imports: [EnvModule, ApiPersistenceModule, AdaptersModule],
	controllers: [ListGoalsController, GetGoalController],
})
export class GoalModule {}
