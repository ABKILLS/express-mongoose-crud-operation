const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs'); // for file system
const bodyParser = require('body-parser');
const connect = require('./config/config');
const find = require('./routes/find');
const del = require('./routes/delete');
const insert = require('./routes/insert');
const update = require('./routes/update');
const index = require('./routes/index');
const app = express();

app.use(bodyParser.json());  // parse body in json format
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(morgan('dev'));
app.use(morgan('common', {stream: fs.createWriteStream('./logs/read-in-employee.log',{flags: 'a'})}));
app.use('/',index);			// add routes for index.js
app.use('/find', find);	// add routes for find.js
app.use('/delete', del);	// add routes for delete.js
app.use('/update', update);	// add routes for update.js
app.use('/insert', insert);	// add routes for insert.js

app.listen(3000, () => {				// listening to port 3000
  console.log('Example app listening on port 3000!')
});
