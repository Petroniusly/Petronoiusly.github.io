let HTTP_BAD_REQUEST = 400;
let NAME = 'ValidationError';

export default class ValidationError extends Error {
	constructor(message) {
		super();
		this.name = NAME;
		this.message = message;
		this.code = HTTP_BAD_REQUEST;
	}
}
