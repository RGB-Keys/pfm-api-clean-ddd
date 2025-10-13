import { AdaptersModule } from '@/api/infra/adapters/adapters.module'
import { ApiPersistenceModule } from '@/api/infra/persistence/api-persistence.module'
import { EnvModule } from '@/shared/infra/env/env.module'
import { Module } from '@nestjs/common'
import { CreateExpenseController } from './create-expense/create-expense.controller'
import { CreateGoalController } from './create-goal/create-goal.controller'
import { CreateIncomeController } from './create-income/create-income.controller'
import { SetMonthlyIncomeController } from './set-monthly-income/set-monthly-income.controller'

@Module({
	imports: [EnvModule, ApiPersistenceModule, AdaptersModule],
	controllers: [
		CreateIncomeController,
		CreateExpenseController,
		CreateGoalController,
		SetMonthlyIncomeController,
	],
})
export class ClientModule {}
