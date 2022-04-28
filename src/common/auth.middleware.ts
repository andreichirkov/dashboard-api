import { IMiddleware } from './middleware.interface'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			//проверяет соответствие токена -> секрету
			//если ок, то он расшифрует payload переданный
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next()
				} else if (payload) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					req.user = payload.email
					next()
				}
			})
		}
		next()
	}
}
