import express, { Express } from 'express';
import { Server } from 'http'
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';

export class App {
	app: Express  //интерфейс Express
	server: Server
	port: number
	logger: LoggerService
	userController: UsersController
	exeptionFilter: ExeptionFilter

	constructor(logger: LoggerService, userController: UsersController, exeptionFilter: ExeptionFilter) {
		this.app = express()  //создание инстанса express
		this.port = 8000
		this.logger = logger
		this.userController = userController
		this.exeptionFilter = exeptionFilter
	}

	useRoutes() {
		//app.use требует роутер, а мы его получаем через юзерКонтроллер
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilter() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
	}

	public async init() {
		this.useRoutes()
		this.useExeptionFilter()
		this.server = this.app.listen(this.port)
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}

