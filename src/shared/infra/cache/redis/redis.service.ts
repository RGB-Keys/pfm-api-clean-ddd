import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { EnvService } from '@shared'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
	constructor(envService: EnvService) {
		super({
			password: envService.get('REDIS_PASSWORD'),
			username: envService.get('REDIS_USER_NAME'),
			host: envService.get('REDIS_HOST'),
			port: envService.get('REDIS_PORT'),
		})
	}

	onModuleDestroy() {
		return this.disconnect()
	}
}
