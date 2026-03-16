import { EnvModule, EnvService } from '@/shared'
import { QUEUES } from '@/shared/core/enums/queues'
import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { QueueModule } from './queues/queue.module'

@Module({
	imports: [
		EnvModule,
		ConfigModule.forRoot({
			isGlobal: true,
			cache: false,
		}),
		BullModule.forRootAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: async (env: EnvService) => ({
				connection: {
					host: env.get('REDIS_HOST'),
					username: env.get('REDIS_USER_NAME'),
					password: env.get('REDIS_PASSWORD'),
					port: env.get('REDIS_PORT'),
				},
				defaultJobOptions: {
					removeOnComplete: 50,
					removeOnFail: 50,
					attempts: 3,
					backoff: {
						type: 'exponential',
						delay: 5000,
					},
				},
			}),
		}),
		BullModule.registerQueue({
			name: QUEUES.SELECTION_PROCESS,
		}),
		QueueModule,
	],
})
export class WorkerModule {}
