import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { Container } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExeptionFilter } from './errors/exeption.filter.interface';

	//внедряем в app через конструктор зависимость
	//от другого сервиса = логгерСервиса
	//простейшая DI

	// const logger = new LoggerService()

	//внедряем зависимости
	// const app = new App(
	// 	logger,
	// 	new UserController(logger),
	// 	new ExeptionFilter(logger)
	// )
const appContainer = new Container()
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService)
appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
appContainer.bind<UserController>(TYPES.UserController).to(UserController)
appContainer.bind<App>(TYPES.Application).to(App)

const app = appContainer.get<App>(TYPES.Application)

app.init()

export { app, appContainer }

