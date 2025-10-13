import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { EnvService } from '@shared'
import { AppModule } from './app.module'
import { DomainErrorFilter } from './infra/http/filters/domain-error.filter'
import { swaggerSetup } from './infra/http/swagger/swagger.config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: '*',
			allowedHeaders: '*',
			exposedHeaders: '*',
		},
	})

	const configService = app.get(EnvService)
	const port = configService.get('PORT')

	swaggerSetup(app)

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	)

	app.useGlobalFilters(new DomainErrorFilter())

	await app.listen(port)
	console.log(`• PFM running on http://localhost:${port}`)
}
bootstrap()
