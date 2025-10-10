import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { Env } from '@shared'
import paginate from 'prisma-extension-paginate'

export function createExtendedClient(env: ConfigService<Env, true>) {
	const client = new PrismaClient()
	return client.$extends(
		paginate({
			cursor: {
				limit: env.get('CURSOR_LIMIT'),
			},
			offset: {
				perPage: env.get('OFFSET_LIMIT'),
			},
		}),
	)
}

export type ExtendedClient = ReturnType<typeof createExtendedClient>
