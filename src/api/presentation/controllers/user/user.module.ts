import { AdaptersModule } from '@/api/infra/adapters/adapters.module'
import { ApiPersistenceModule } from '@/api/infra/persistence/api-persistence.module'
import { EnvModule } from '@/shared/infra/env/env.module'
import { Module } from '@nestjs/common'
import { AuthenticateUserController } from './authenticate/auth-user.controller'
import { RegisterClientController } from './register/register-client.controller'

@Module({
	imports: [EnvModule, ApiPersistenceModule, AdaptersModule],
	controllers: [RegisterClientController, AuthenticateUserController],
})
export class UserModule {}
