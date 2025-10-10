import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvService } from './env.service'

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, cache: false })],
	providers: [EnvService],
	exports: [EnvService],
})
export class EnvModule {}
