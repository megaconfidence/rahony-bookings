import {Router} from 'express';
import {routeCatch} from '../../utils';
import {routes} from '../../validations';
import {get} from './controller';

const router = Router();

router.route('/').post(routes.pricing.get, get);

export const pricingRouter = router;
