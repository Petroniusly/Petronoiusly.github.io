const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
	return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

let logger = createLogger({
	format: combine(
		label({ label: 'frontCamp test logger' }),
		timestamp(),
		myFormat
	),
	transports: [
		new transports.Console(),
		new transports.File({
			filename: 'logs/info.log',
			level: 'info'
		}),
		new transports.File({
			filename: 'logs/errors.log',
			level: 'error'
		})
	],
	exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })]
});

logger.logConnect = (req, res, next) => {
	logger.info(`${req.method} ${req.originalUrl} from IP ${req.ip}`);
	next();
};

logger.logClientError = message => {
	logger.error(message);
};

logger.logServerError = (err, req, res, next) => {
	logger.error(err);
	next(err);
};

logger.serverInfo = message => {
	logger.info(message);
};

logger.serverError = message => {
	logger.info(message);
};

/**
 * Module exports
 */
module.exports = logger;
