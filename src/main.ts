import { App } from './app'
import { LoggerService } from './logger/logger.service'
import { UserController } from './users/users.controller'
import { ExeptionFilter } from './errors/exeption.filter'
import { Container, ContainerModule, interfaces } from 'inversify'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'
import { IExeptionFilter } from './errors/exeption.filter.interface'
import { UsersService } from './users/users.service'
import { IUserController } from './users/users.controller.interface'
import { IUserService } from './users/users.service.interface'

export interface IBootstrapReturn {
	appContainer: Container
	app: App
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService)
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
	bind<IUserController>(TYPES.UserController).to(UserController)
	bind<IUserService>(TYPES.UserService).to(UsersService)
	bind<App>(TYPES.Application).to(App)
})

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container()
	appContainer.load(appBindings)
	const app = appContainer.get<App>(TYPES.Application)
	app.init()

	return { app, appContainer }
}

export const { app, appContainer } = bootstrap()
