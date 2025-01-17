import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router';

const app = express();
app.use(cors({credentials:true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/')
});

const MONGO_URL = 'mongodb://kudlay2014:XGiDBy1xyWmieFxS@ac-a0mgk4s-shard-00-00.mawirhf.mongodb.net:27017,ac-a0mgk4s-shard-00-01.mawirhf.mongodb.net:27017,ac-a0mgk4s-shard-00-02.mawirhf.mongodb.net:27017/?ssl=true&replicaSet=atlas-pskqca-shard-0&authSource=admin&retryWrites=true&w=majority&appName=FreeMongoDB';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error:Error) => console.log(error));

app.use('/', router());

