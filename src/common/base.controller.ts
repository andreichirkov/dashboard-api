import { Response, Router } from 'express'
import { ExpressReturnType, IControllerRoute } from './route.interface'
import { ILogger } from '../logger/logger.interface'
import { injectable } from 'inversify'
import 'reflect-metadata'

//инстанс абстрактного класса нельзя создать
//базовый класс, в каком то конкретном контроллере можно нарастить его функциональность
@injectable()
export abstract class BaseController {
	//c _ потому что будут геттеры и сеттеры для него
	private readonly _router: Router

	constructor(private logger: ILogger) {
		this._router = Router()
	}

	get router(): Router {
		return this._router
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json')
		return res.status(code).json(message)
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message)
	}

	public created(res: Response): ExpressReturnType {
		return res.status(201)
	}

	//нельзя вызывать из инстанса класса, но можно из наследника
	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`)
			const middleware = route.middlewares?.map((m) => m.execute.bind(m))

			//тут может потеряться контекст, потому что он будет относиться к funk
			const handler = route.func.bind(this)
			const pipeline = middleware ? [...middleware, handler] : handler
			this.router[route.method](route.path, pipeline)
		}
	}
}
