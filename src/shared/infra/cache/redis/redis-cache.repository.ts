import { Injectable } from '@nestjs/common'
import { EnvService } from '@shared'
import { str } from 'crc-32'
import { CacheRepository } from '../cache.repository'
import { RedisService } from './redis.service'

@Injectable()
export class RedisCacheRepository implements CacheRepository {
	private readonly KEY_PREFIX?: string

	constructor(
		private redis: RedisService,
		envService: EnvService,
	) {
		this.KEY_PREFIX = envService.get('REDIS_KEY_PREFIX')
	}

	async set(key: string, value: string, ttl: number = 60 * 15): Promise<void> {
		await this.redis.set(this.setKeyPrefix(key), value, 'EX', ttl)
	}

	async get(key: string): Promise<string | null> {
		return await this.redis.get(this.setKeyPrefix(key))
	}

	async delete(key: string): Promise<void> {
		await this.redis.del(this.setKeyPrefix(key))
	}

	generateCacheKey(baseKey: string, params: Record<string, any>) {
		const paramsString = JSON.stringify(params)
		const hash = str(paramsString)

		return `${baseKey}:${hash}`
	}

	private setKeyPrefix(key: string): string {
		return `${this.KEY_PREFIX}:${key}`
	}
}
