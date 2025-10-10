import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { Env } from '../../env/env'
import { createExtendedClient, ExtendedClient } from './extend-client'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(private configService: ConfigService<Env, true>) {
		super()
		this.extendedClient = createExtendedClient(this.configService)
	}

	readonly extendedClient: ExtendedClient

	async onModuleInit() {
		await this.$connect()
	}

	async onModuleDestroy() {
		await this.$disconnect()
	}
}
