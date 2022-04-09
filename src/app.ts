import express, { Express } from 'express'
import { Server } from 'http' //тип сервер
import { UserController } from './users/users.controller'
import { ExeptionFilter } from './errors/exeption.filter'
import { ILogger } from './logger/logger.interface'
import { inject, injectable } from 'inversify'
import { TYPES } from './types'
import { json } from 'body-parser'
import 'reflect-metadata'

@injectable()
export class App {
	app: Express //интерфейс Express
	server: Server
	port: number

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
	) {
		this.app = express() //создание инстанса express
		this.port = 8000
	}

	useMiddleware(): void {
		this.app.use(json())
	}

	useRoutes(): void {
		//app.use требует роутер, а мы его получаем через юзерКонтроллер, через get
		this.app.use('/users', this.userController.router)
	}

	useExeptionFilter(): void {
		//байндим контекст exeptionFilter
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
	}

	public async init(): Promise<void> {
		this.useMiddleware()
		this.useRoutes()
		this.useExeptionFilter()
		this.server = this.app.listen(this.port)
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
	}
}
