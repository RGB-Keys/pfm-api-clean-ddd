import { EnvModule } from '@/shared'
import { Module } from '@nestjs/common'
import { HttpModule } from './infra/http.module'
import { AuthModule } from './infra/http/auth/auth.module'

@Module({
	imports: [EnvModule, AuthModule, HttpModule],
})
export class AppModule {}
