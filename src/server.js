import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import config from './config';
import connectToDB from './utils/db';

// defining the express app
export const app = express();

// enabling cors for all requests
app.use(cors());

// using bodyParser to parse JSON bodies into JS objects
app.use(json());
app.use(urlencoded({ extended: true }));

// adding morgan to log HTTP requests
app.use(morgan('dev'));

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
