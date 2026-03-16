import { ClientRepository } from '@/api/application/repositories/client.repository'
import { ExpenseRepository } from '@/api/application/repositories/expense.repository'
import { GetExpenseUseCase } from '@/api/application/use-cases/expense/get-expense.use-case'
import { ListExpenseUseCase } from '@/api/application/use-cases/expense/list-expense.use-case'
import { Provider } from '@nestjs/common'

export const ExpenseAdapter: Provider[] = [
	{
		provide: GetExpenseUseCase,
		useFactory: (
			clientRepository: ClientRepository,
			expenseRepository: ExpenseRepository,
		) => new GetExpenseUseCase(clientRepository, expenseRepository),
		inject: [ClientRepository, ExpenseRepository],
	},
	{
		provide: ListExpenseUseCase,
		useFactory: (expenseRepository: ExpenseRepository) =>
			new ListExpenseUseCase(expenseRepository),
		inject: [ExpenseRepository],
	},
]
