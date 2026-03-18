import { Module } from '@nestjs/common'
import { CryptographyModule } from '../http/cryptography/cryptography.module'
import { ApiPersistenceModule } from '../persistence/api-persistence.module'
import { EventsModule } from './events/event.module'
import { ClientAdapter } from './use-cases/client.adapter'
import { ExpenseAdapter } from './use-cases/expense.adapter'
import { GoalAdapter } from './use-cases/goal.adapter'
import { IncomeAdapter } from './use-cases/income.adapter'
import { ReportAdapter } from './use-cases/report.adapter'
import { UserAdapter } from './use-cases/user.adapter'

@Module({
	imports: [ApiPersistenceModule, CryptographyModule, EventsModule],
	providers: [
		...UserAdapter,
		...ClientAdapter,
		...IncomeAdapter,
		...ExpenseAdapter,
		...GoalAdapter,
		...ReportAdapter,
	],
	exports: [
		...UserAdapter,
		...ClientAdapter,
		...IncomeAdapter,
		...ExpenseAdapter,
		...GoalAdapter,
		...ReportAdapter,
	],
})
export class AdaptersModule {}
