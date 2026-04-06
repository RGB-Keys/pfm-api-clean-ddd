import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { EnvService, PrismaService } from '@/shared'
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { RedisOptions, Transport } from '@nestjs/microservices'
import { ApiTags } from '@nestjs/swagger'
import {
	HealthCheck,
	HealthCheckService,
	MemoryHealthIndicator,
	MicroserviceHealthIndicator,
	PrismaHealthIndicator,
} from '@nestjs/terminus'

@ApiTags(SWAGGER_TAGS.HEALTH)
@Controller('health')
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private memory: MemoryHealthIndicator,
		private db: PrismaHealthIndicator,
		private microservice: MicroserviceHealthIndicator,
		private prisma: PrismaService,
		private envService: EnvService,
	) {}

	@Get('liveness')
	@HealthCheck()
	@HttpCode(HttpStatus.OK)
	checkLiveness() {
		return this.health.check([
			() => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
		])
	}

	@Get('readiness')
	@HealthCheck()
	checkReadiness() {
		return this.health.check([
			() => this.db.pingCheck('database', this.prisma.getClient()),
			() =>
				this.microservice.pingCheck<RedisOptions>('redis', {
					transport: Transport.REDIS,
					options: {
						host: this.envService.get('REDIS_DOCKER_HOST') || 'localhost',
						port: this.envService.get('REDIS_PORT') || 6379,
						password: this.envService.get('REDIS_PASSWORD') || undefined,
					},
				}),
		])
	}
}
