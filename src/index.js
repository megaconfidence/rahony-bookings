import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import {secrets} from './config';
import {mongo} from './services';
import bodyParser from 'body-parser';
import {authRouter, bookingRouter} from './resources';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.use('/auth', authRouter);
app.use('/api/booking', bookingRouter);

app.use(({message, stack, details, statusCode}, _, res, __) => {
  return res.status(statusCode || 500).send({
    message: message || 'an error occured',
    error: details || stack,
  });
});

app.listen(secrets.port, async () => {
  mongo();
  console.log('server on http://localhost:' + secrets.port);
});
