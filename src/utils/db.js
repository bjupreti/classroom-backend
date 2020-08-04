import mongoose from 'mongoose';
import config from '../config';

export default function connectToDB(url = config.dbConnect) {
  return mongoose.connect(
    url,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log('connected to db!');
    }
  );
}
