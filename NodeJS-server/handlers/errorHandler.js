const logger = require('./logger');
const HTTP_INTERNAL_SERVER_ERROR = 500;
const MESSAGE = 'Internal Server Error';

/**
 * Express standard error middleware
 *
 * @param  {Error}      err     error object
 * @param  {Object}     req     express request object
 * @param  {Object}     res     express response object
 * @param  {Function}   next    express next function
 */
let serverErrors = (err, req, res, next) => {
	res.status(err.code || HTTP_INTERNAL_SERVER_ERROR).json(err.error || MESSAGE);
};

let databaseErrors = err => {
	return {
		code: HTTP_INTERNAL_SERVER_ERROR,
		error: err.errmsg
	};
};

let clientErrors = (err, req, res, next) => {
	if (req.xhr) {
		logger.logClientError(`Something failed in request`);
		res.status(500).send({ error: 'Something failed!' });
	} else {
		next(err);
	}
};

/**
 * Module exports
 */
module.exports.serverErrors = serverErrors;
module.exports.databaseErrors = databaseErrors;
module.exports.clientErrors = clientErrors;
