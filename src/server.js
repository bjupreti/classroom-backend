import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import config from './config';
import connectToDB from './utils/db';
import { signup, signin, protect } from './utils/auth';

export const app = express();

app.use(cors()); // enabling cors for all requests
app.use(json()); // using bodyParser to parse JSON bodies into JS objects
app.use(urlencoded({ extended: true }));
app.use(morgan('dev')); // adding morgan to log HTTP requests

// routes middleware
app.post('/api/signup', signup);
app.post('/api/signin', signin);

app.get('/api/course', protect, (req, res) => {
  res.status(200).send({ message: 'Success' });
});

app.get('/', (req, res) => {
  res.send({ message: 'hello fusemachine' });
});

export const start = async () => {
  try {
    connectToDB();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api/v1`);
    });
  } catch (e) {
    console.error(e);
  }
};
