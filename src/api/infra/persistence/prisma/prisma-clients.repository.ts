import {
	ClientRepository,
	FindUniqueClientParams,
} from '@/api/application/repositories/client.repository'
import { Client } from '@/api/domain/entities/client.entity'
import { PrismaExtendedClient, PrismaService } from '@/shared'
import { Injectable } from '@nestjs/common'
import { PrismaClientMapper } from '../mappers/prisma-client.mapper'

@Injectable()
export class PrismaClientRepository implements ClientRepository {
	private readonly db: PrismaExtendedClient

	constructor(private prisma: PrismaService) {
		this.db = prisma.getClient()
	}

	async findUnique({
		email,
		clientId,
	}: FindUniqueClientParams): Promise<Client | null> {
		const client = await this.db.client.findFirst({
			where: {
				OR: [{ id: clientId }, { user: { email } }],
			},
			include: {
				user: true,
				expenses: true,
				goals: true,
				incomes: true,
			},
		})

		if (!client) return null

		return PrismaClientMapper.toDomain(client)
	}

	async create(client: Client): Promise<void> {
		await this.db.client.create({
			data: PrismaClientMapper.toPrismaCreate(client),
		})
	}

	async save(client: Client): Promise<void> {
		const data = PrismaClientMapper.toPrismaUpdate(client)

		await this.db.client.update({
			where: { id: client.id.toString() },
			data,
		})
	}

	async remove(client: Client): Promise<void> {
		const data = PrismaClientMapper.toPrismaCreate(client)

		await this.db.client.delete({ where: { id: data.id } })
	}
}
