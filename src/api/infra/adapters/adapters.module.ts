import { Module } from '@nestjs/common'
import { CryptographyModule } from '../http/cryptography/cryptography.module'
import { ApiPersistenceModule } from '../persistence/api-persistence.module'
import { EventsModule } from './events/event.module'
import { ClientAdapter } from './use-cases/client.adapter'
import { UserAdapter } from './use-cases/user.adapter'

@Module({
	imports: [ApiPersistenceModule, CryptographyModule, EventsModule],
	providers: [...UserAdapter, ...ClientAdapter],
	exports: [...UserAdapter, ...ClientAdapter],
})
export class AdaptersModule {}
