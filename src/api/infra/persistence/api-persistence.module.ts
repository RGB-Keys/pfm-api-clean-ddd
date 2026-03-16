import { ClientRepository } from '@/api/application/repositories/client.repository'
import { ExpenseRepository } from '@/api/application/repositories/expense.repository'
import { GoalRepository } from '@/api/application/repositories/goal.repository'
import { IncomeRepository } from '@/api/application/repositories/income.repository'
import { CacheModule } from '@/shared/infra/cache/cache.module'
import { DatabaseModule } from '@/shared/infra/database/database.module'
import { Module } from '@nestjs/common'
import { PrismaClientRepository } from './prisma/prisma-clients.repository'
import { PrismaExpenseRepository } from './prisma/prisma-expenses.repository'
import { PrismaGoalRepository } from './prisma/prisma-goals.repository'
import { PrismaIncomeRepository } from './prisma/prisma-incomes.repository'

@Module({
	imports: [DatabaseModule, CacheModule],
	providers: [
		{
			provide: ClientRepository,
			useClass: PrismaClientRepository,
		},
		{
			provide: IncomeRepository,
			useClass: PrismaIncomeRepository,
		},
		{
			provide: ExpenseRepository,
			useClass: PrismaExpenseRepository,
		},
		{
			provide: GoalRepository,
			useClass: PrismaGoalRepository,
		},
	],
	exports: [
		ClientRepository,
		IncomeRepository,
		ExpenseRepository,
		GoalRepository,
	],
})
export class ApiPersistenceModule {}
