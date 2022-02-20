import { NextFunction, Request, Response, Router } from 'express';

export interface IControllerRoute {
	path: string
	func: (req: Request, res: Response, next: NextFunction) => void

	//Pick берет значения из интерфейса и создает из них новый интерфейс
	//Интерфейс из роутера который состоит только из переданных вещей
	//Достаем все методы эти короче видимо так
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
}
