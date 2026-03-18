import { ClientRepository } from '@/api/application/repositories/client.repository'
import { FinancialReportUseCase } from '@/api/application/use-cases/reports/reports-financial.use-case'
import { Provider } from '@nestjs/common'

export const ReportAdapter: Provider[] = [
	{
		provide: FinancialReportUseCase,
		useFactory: (clientRepository: ClientRepository) =>
			new FinancialReportUseCase(clientRepository),
		inject: [ClientRepository],
	},
]
