import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import {secrets} from './config';
import {mongo} from './services';
import bodyParser from 'body-parser';
import {authRouter, bookingRouter, pricingRouter} from './resources';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (_, res) => {
  res.send({ok: true});
});
app.use('/ticket', express.static(path.join(__dirname, 'ticket')));
app.use('/auth', authRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/pricing', pricingRouter);

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
