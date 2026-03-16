import { ApiPersistenceModule } from '@/api/infra/persistence/api-persistence.module'
import { forwardRef, Module } from '@nestjs/common'
import { BalanceWorker } from '../workers/balance.worker'
import { SelectionProcessQueue } from './selection-process.service'

@Module({
	imports: [forwardRef(() => ApiPersistenceModule)],
	providers: [SelectionProcessQueue, BalanceWorker],
	exports: [SelectionProcessQueue],
})
export class QueueModule {}
