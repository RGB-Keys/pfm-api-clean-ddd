import { NestFactory } from '@nestjs/core'
import { WorkerModule } from './worker.module'

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(WorkerModule)
	app.init()

	console.log("workers it's running 🛠️")
}

bootstrap()
