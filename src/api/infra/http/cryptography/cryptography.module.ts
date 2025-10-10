import { Encrypter } from '@/api/application/cryptography/encrypter'
import { HashComparer } from '@/api/application/cryptography/hash-comparer'
import { HashGenerator } from '@/api/application/cryptography/hash-generator'
import { Module } from '@nestjs/common'
import { BcryptHasher } from './bycrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
	providers: [
		{ provide: Encrypter, useClass: JwtEncrypter },
		{ provide: HashGenerator, useClass: BcryptHasher },
		{ provide: HashComparer, useClass: BcryptHasher },
	],
	exports: [Encrypter, HashGenerator, HashComparer],
})
export class CryptographyModule {}
