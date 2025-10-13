import { Module } from '@nestjs/common'
import { ClientModule } from '../presentation/controllers/client/client.module'
import { ExpenseModule } from '../presentation/controllers/expense/expense.module'
import { GoalModule } from '../presentation/controllers/goal/goal.module'
import { IncomeModule } from '../presentation/controllers/income/income.module'
import { UserModule } from '../presentation/controllers/user/user.module'

@Module({
	imports: [UserModule, ClientModule, IncomeModule, ExpenseModule, GoalModule],
})
export class HttpModule {}
