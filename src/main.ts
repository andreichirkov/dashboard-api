import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';

async function bootstrap() {
	//внедряем в app через конструктор зависимость
	//от другого сервиса = логгерСервиса
	//простейшая DI

	const logger = new LoggerService()
	const app = new App(logger, new UsersController(logger))
	await app.init()
}

bootstrap()
