import { DatabaseModule, EnvModule } from '@/shared'
import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from './api-health/health.controller'

@Module({
	imports: [TerminusModule, DatabaseModule, EnvModule],
	controllers: [HealthController],
})
export class HealthModule {}
