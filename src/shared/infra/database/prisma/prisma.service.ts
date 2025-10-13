import { EnvService } from '@/shared'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { createExtendedClient, PrismaExtendedClient } from './extend-client'

@Injectable()
export class PrismaService implements OnModuleInit {
	private readonly client: PrismaExtendedClient

	constructor(private readonly envService: EnvService) {
		this.client = createExtendedClient(this.envService)
	}

	async onModuleInit() {
		await this.client.$connect()
	}

	async onModuleDestroy() {
		await this.client.$disconnect()
	}

	getClient() {
		return this.client
	}
}
