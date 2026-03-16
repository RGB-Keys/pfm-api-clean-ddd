import { PrismaClient } from '@prisma/client'
import { EnvService } from '@shared'
import paginate from 'prisma-extension-paginate'

export function createExtendedClient(env: EnvService) {
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

export type PrismaExtendedClient = ReturnType<typeof createExtendedClient>
