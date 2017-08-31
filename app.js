import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import fs from 'fs'; // for file system
import bodyParser from 'body-parser';
import connect from './config/config';
import find from './routes/find';
import del from './routes/delete';
import insert from './routes/insert';
import update from './routes/update';
import http from 'http';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(morgan('dev'));
app.use(morgan('common', {stream: fs.createWriteStream('./logs/read-in-employee.log',{flags: 'a'})}));

app.use('/find', find);
app.use('/delete', del);
app.use('/update', update);
app.use('/insert', insert);

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => {
  console.log('Example app listening on port 3000!')
});
