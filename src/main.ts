import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';

async function bootstrap() {
	//внедряем в app через конструктор зависимость
	//от другого сервиса = логгерСервиса
	//простейшая DI

	const logger = new LoggerService()

	//внедряем зависимости
	const app = new App(
		logger,
		new UsersController(logger),
		new ExeptionFilter(logger)
	)

	await app.init()
}

bootstrap()
