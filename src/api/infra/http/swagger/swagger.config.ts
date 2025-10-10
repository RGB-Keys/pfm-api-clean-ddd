import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SWAGGER_TAGS } from './tags/swagger-tags'

export function swaggerSetup(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('Personal Finance Manager')
		.setDescription('Documentação do PFM')
		.setVersion('1.0')
		.addServer('http://localhost:3000/', 'Local environment')
		// .addServer('http://185.173.110.102:9778/', 'Dev')
		.addBearerAuth()
		.build()

	Object.values(SWAGGER_TAGS)
		.sort()
		.map((tag) => config.tags!.push({ name: tag }))

	const documentFactory = () => SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, documentFactory)
}
