import { AdaptersModule } from '@/api/infra/adapters/adapters.module'
import { ApiPersistenceModule } from '@/api/infra/persistence/api-persistence.module'
import { EnvModule } from '@/shared'
import { Module } from '@nestjs/common'
import { GetExpenseController } from './get-expense/get-expense.controller'
import { ListExpensesController } from './list-expense/list-expense.controller'

@Module({
	imports: [EnvModule, ApiPersistenceModule, AdaptersModule],
	controllers: [ListExpensesController, GetExpenseController],
})
export class ExpenseModule {}
