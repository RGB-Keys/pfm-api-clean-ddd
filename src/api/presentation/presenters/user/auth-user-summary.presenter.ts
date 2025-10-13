import { Client } from '@/api/domain/entities/client.entity'

export class AuthenticateUserPresenter {
	static toHttp(client: Client, token: string) {
		return {
			token,
			user: {
				id: client.id.toString(),
				email: client.email,
				role: client.role,
			},
		}
	}
}
