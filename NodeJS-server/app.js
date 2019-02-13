const express = require('express');
const process = require('process');
const mongoose = require('mongoose');
const logger = require('./handlers/logger');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/errorHandler');
const connectOptions = require('./configuration/mangoose.options.json');

const app = express();
const port = 3000;

logger.serverInfo(`Server start with process pid ${process.pid}`);
logger.serverInfo(`NODE_ENV =  ${JSON.stringify(process.env.NODE_ENV)}`);

mongoose
	.connect(
		'mongodb://localhost:27017/db',
		connectOptions
	)
	.then(
		() => {
			logger.serverInfo(`DB server is connected`);
		},
		err => {
			logger.serverError(`DB connection was failed. More info: /n ${err}`);
		}
	);

app.get('env');
app.use(bodyParser.json());
app.use('/', routes);
app.use(logger.logServerError);
app.use(errorHandler.clientErrors);
app.use(errorHandler.serverErrors);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
