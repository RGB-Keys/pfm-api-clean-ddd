import { ClientRepository } from '@/api/application/repositories/client.repository'
import { IncomeRepository } from '@/api/application/repositories/income.repository'
import { GetIncomeUseCase } from '@/api/application/use-cases/income/get-income.use-case'
import { ListIncomeUseCase } from '@/api/application/use-cases/income/list-income.use-case'
import { Provider } from '@nestjs/common'

export const IncomeAdapter: Provider[] = [
	{
		provide: GetIncomeUseCase,
		useFactory: (
			clientRepository: ClientRepository,
			incomeRepository: IncomeRepository,
		) => new GetIncomeUseCase(clientRepository, incomeRepository),
		inject: [ClientRepository, IncomeRepository],
	},
	{
		provide: ListIncomeUseCase,
		useFactory: (incomeRepository: IncomeRepository) =>
			new ListIncomeUseCase(incomeRepository),
		inject: [IncomeRepository],
	},
]
