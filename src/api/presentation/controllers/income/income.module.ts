import { AdaptersModule } from '@/api/infra/adapters/adapters.module'
import { ApiPersistenceModule } from '@/api/infra/persistence/api-persistence.module'
import { EnvModule } from '@/shared'
import { Module } from '@nestjs/common'
import { GetIncomeController } from './get-income/get-income.controller'
import { ListIncomesController } from './list-income/list-income.controller'

@Module({
	imports: [EnvModule, ApiPersistenceModule, AdaptersModule],
	controllers: [ListIncomesController, GetIncomeController],
})
export class IncomeModule {}
