import { NextFunction, Request, Response } from 'express';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata'

@injectable()
export class ExeptionFilter implements IExeptionFilter {

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	//err юнион тип от Error и HTTPError
	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		//instanceof хорошо для проверки юнион типов
		if (err instanceof HTTPError) {
			//запись в логгер
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode} : ${err.message}`)
			//отпрвка на фронт (insomnia например)
			res.status(err.statusCode).send({ err: err.message })
		} else {
			this.logger.error(`${err.message}`)
			res.status(500).send({ err: err.message })
		}
	}
}
