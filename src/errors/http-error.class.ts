export class HTTPError extends Error {
	statusCode: number
	context?: string
	//мессадж есть в ерроре и объявлять его не нужно

	constructor(statusCode: number, message: string, context?: string) {
		super(message)
		this.statusCode = statusCode
		this.message = message
		this.context = context
	}
}
