import { Logger } from 'tslog'
import { ILogger } from './logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata'

//логгер должен удовлетворять интервейс айЛоггер
//свойства и методы дальше это и есть конкретная имплементация
@injectable()
export class LoggerService implements ILogger {
	public logger: Logger

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,  //не нужен так как логгер один
			displayFilePath: 'hidden',
			displayFunctionName: false
		})
	}

	//писать static log был бы самый тупой способ, импортируем класс и потом вызываем методы
	log(...args: unknown[]) {
		this.logger.info(...args)
	}

	error(...args: unknown[]) {
		this.logger.error(...args)
	}

	warn(...args: unknown[]) {
		this.logger.warn(...args)
	}
}
