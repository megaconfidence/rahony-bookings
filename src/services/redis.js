import IOredis from 'ioredis';
import {secrets} from '../config';

const redis = new IOredis(secrets.redis);
export default redis;
