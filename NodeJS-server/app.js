const express = require('express');
const process = require('process');
const logger = require('./handlers/logger');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/errorHandler');

const app = express();
const port = 3000;

logger.serverStart(`Server start with process pid ${process.pid}`);
logger.serverStart(`NODE_ENV =  ${JSON.stringify(process.env.NODE_ENV)}`);

app.get('env');
app.use(bodyParser.json());
app.use('/', routes);
app.use(logger.logServerError);
app.use(errorHandler.clientErrors);
app.use(errorHandler.serverErrors);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));