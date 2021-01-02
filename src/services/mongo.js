import mongoose from 'mongoose';
import {secrets} from '../config';

const mongo = async () => {
  return await mongoose.connect(secrets.mongo, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

export default mongo;
