import { EventPayloads, JOBS, QUEUES } from '@/shared'
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { BalanceWorker } from '../workers/balance.worker'

@Processor(QUEUES.SELECTION_PROCESS, {
	concurrency: 20,
})
export class SelectionProcessQueue extends WorkerHost {
	constructor(private readonly balanceWorker: BalanceWorker) {
		super()
	}

	async process(job: Job<EventPayloads['balance']>): Promise<any> {
		if (job.name === JOBS.BALANCE) {
			await this.balanceWorker.execute(job.data)
		}
	}
}
