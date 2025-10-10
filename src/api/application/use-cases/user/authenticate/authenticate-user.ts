import { Encrypter } from '@/api/application/cryptography/encrypter'
import { HashComparer } from '@/api/application/cryptography/hash-comparer'
import { ClientRepository } from '@/api/application/repositories/client.repository'
import { WrongCrenditialsError } from '@/api/core/errors/domain/user/wrong-crenditials-error'
import { Client } from '@/api/domain/entities/client.entity'
import { Either, fail, success } from '@/shared/core/errors/either/either'

export interface AuthenticateUserUseCaseRequest {
	email: string
	password: string
}

type AuthenticateUserUseCaseResponse = Either<
	WrongCrenditialsError,
	{
		accessToken: string
		client: Client
	}
>

export class AuthenticateUserUseCase {
	constructor(
		private readonly clientRepository: ClientRepository,
		private readonly hashComparer: HashComparer,
		private readonly encrypter: Encrypter,
	) {}

	async execute({
		email,
		password,
	}: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
		const client = await this.clientRepository.findUnique({ email })

		if (!client) return fail(new WrongCrenditialsError())

		const isPasswordValid = await this.hashComparer.compare(
			password,
			client.passwordHash,
		)

		if (!isPasswordValid) return fail(new WrongCrenditialsError())

		const accessToken = await this.encrypter.encrypt({
			sub: client.id.toString(),
		})

		return success({ accessToken, client })
	}
}
