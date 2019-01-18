const express = require('express');
const routes = require('./routes/routes');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;
"C: create, R: read, U: update, and D: delete"
"create - put, read - get, update - post, delete - delete"

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));