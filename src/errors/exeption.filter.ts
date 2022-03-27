import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class';

export class ExeptionFilter implements IExeptionFilter {
	logger: LoggerService

	constructor(logger: LoggerService) {
		this.logger = logger
	}

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
