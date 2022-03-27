import express, { Express } from 'express';
import { Server } from 'http' //тип сервер
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';

export class App {
	app: Express  //интерфейс Express
	server: Server
	port: number
	logger: ILogger
	userController: UsersController
	exeptionFilter: ExeptionFilter

	constructor(logger: ILogger, userController: UsersController, exeptionFilter: ExeptionFilter) {
		this.app = express()  //создание инстанса express
		this.port = 8000
		this.logger = logger
		this.userController = userController
		this.exeptionFilter = exeptionFilter
	}

	useRoutes() {
		//app.use требует роутер, а мы его получаем через юзерКонтроллер, через get
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilter() {
		//байндим контекст exeptionFilter
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
	}

	public async init() {
		this.useRoutes()
		this.useExeptionFilter()
		this.server = this.app.listen(this.port)
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}

