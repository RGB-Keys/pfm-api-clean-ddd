import { ClientRepository } from '@/api/application/repositories/client.repository'
import { CreateIncomeUseCase } from '@/api/application/use-cases/client/create-income.use-case'
import { SetMonthlyIncomeUseCase } from '@/api/application/use-cases/client/set-monthly-income.use-case'
import { EventBus } from '@/shared/core/events/event-bus'
import { Provider } from '@nestjs/common'

export const ClientAdapter: Provider[] = [
	{
		provide: SetMonthlyIncomeUseCase,
		useFactory: (clientRepository: ClientRepository) =>
			new SetMonthlyIncomeUseCase(clientRepository),
		inject: [ClientRepository],
	},
	{
		provide: CreateIncomeUseCase,
		useFactory: (clientRepository: ClientRepository, eventBus: EventBus) =>
			new CreateIncomeUseCase(clientRepository, eventBus),
		inject: [ClientRepository, EventBus],
	},
]
