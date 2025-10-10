import { Encrypter } from '@/api/application/cryptography/encrypter'
import { HashComparer } from '@/api/application/cryptography/hash-comparer'
import { HashGenerator } from '@/api/application/cryptography/hash-generator'
import { ClientRepository } from '@/api/application/repositories/client.repository'
import { AuthenticateUserUseCase } from '@/api/application/use-cases/user/authenticate/authenticate-user'
import { RegisterClientUseCase } from '@/api/application/use-cases/user/register/register-client.use-case'
import { Provider } from '@nestjs/common'

export const UserAdapter: Provider[] = [
	{
		provide: RegisterClientUseCase,
		useFactory: (
			clientRepository: ClientRepository,
			hashGenerator: HashGenerator,
		) => new RegisterClientUseCase(clientRepository, hashGenerator),
		inject: [ClientRepository, HashGenerator],
	},
	{
		provide: AuthenticateUserUseCase,
		useFactory: (
			clientRepository: ClientRepository,
			hashComparer: HashComparer,
			encrypter: Encrypter,
		) => new AuthenticateUserUseCase(clientRepository, hashComparer, encrypter),
		inject: [ClientRepository, HashGenerator, Encrypter],
	},
]
