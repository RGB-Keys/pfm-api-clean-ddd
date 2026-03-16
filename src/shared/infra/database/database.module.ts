import { Module } from '@nestjs/common'
import { PrismaService } from '@shared/infra/database/prisma/prisma.service'
import { EnvModule } from '../env/env.module'

@Module({
	imports: [EnvModule],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class DatabaseModule {}
