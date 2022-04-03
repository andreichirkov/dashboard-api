import { NextFunction, Request, Response, Router } from 'express'

export interface IControllerRoute {
	path: string
	func: (req: Request, res: Response, next: NextFunction) => void

	//Pick берет значения из интерфейса и создает из них новый интерфейс
	//Интерфейс из роутера который состоит только из переданных вещей
	//Достаем все методы эти короче видимо так
	//keyof получает ключи, TS уже тут проверяет существование методов таких в Router
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
}

export type ExpressReturnType = Response<any, Record<string, any>>
