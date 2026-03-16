import { ClientNotFoundError } from '@/api/core/errors/domain/client/client-not-found-error'
import { Client } from '@/api/domain/entities/client.entity'
import { Either, fail, success } from '@/shared/core/errors/either/either'
import { ClientRepository } from '../../repositories/client.repository'

interface GetClientUseCaseRequest {
	clientId: string
}

type GetClientUseCaseResponse = Either<
	ClientNotFoundError,
	{
		client: Client
	}
>

export class GetClientUseCase {
	constructor(private readonly clientRepository: ClientRepository) {}

	async execute({
		clientId,
	}: GetClientUseCaseRequest): Promise<GetClientUseCaseResponse> {
		const client = await this.clientRepository.findUnique({ clientId })

		if (!client) return fail(new ClientNotFoundError())

		return success({ client })
	}
}
