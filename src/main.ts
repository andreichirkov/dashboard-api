import { App } from './app';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
	//внедряем в app через конструктор зависимость
	//от другого сервиса = логгерСервиса
	//простейшая DI
	const app = new App(new LoggerService())
	await app.init()
}

bootstrap()
