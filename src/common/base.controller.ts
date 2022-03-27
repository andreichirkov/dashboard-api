import { LoggerService } from '../logger/logger.service';
import { Response, Router } from 'express';
import { IControllerRoute } from './route.interface';

//инстанс абстрактного класса нельзя создать
//базовый класс, в каком то конкретном контроллере можно нарастить его функциональность
export abstract class BaseController {
	//c _ потому что будут геттеры и сеттеры для него
	private readonly _router: Router

	constructor(private logger: LoggerService) {
		this._router = Router()
	}

	get router() {
		return this._router
	}

	public send<T>(res: Response, code: number, message: T) {
		res.type('application/json')
		return res.status(code).json(message)
	}

	public ok<T>(res: Response, message: T) {
		return this.send<T>(res, 200, message)
	}

	public created(res: Response) {
		return res.status(201)
	}

	//нельзя вызывать из инстанса класса, но можно из наследника
	protected bindRoutes(routes: IControllerRoute[]) {
		for(const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`)

			//тут может потеряться контекст, потому что он будет относиться к funk
			const handler = route.func.bind(this)
			this.router[route.method](route.path, handler)
		}
	}
}
