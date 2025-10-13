import { Client } from '@/api/domain/entities/client.entity'

export class ClientSummaryPresenter {
	static toHttp(client: Client) {
		return {
			id: client.id.toString(),
			name: client.name,
			phoneNumber: client.phoneNumber,
			user: {
				email: client.email,
				role: client.role,
				avatarUrl: client.avatarUrl,
				createdAt: client.createdAt,
				updatedAt: client.updatedAt,
			},
		}
	}
}
