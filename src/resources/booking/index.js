import {Router} from 'express';
import {protect, routeCatch} from '../../utils';
import {routes} from '../../validations';
import {create, getAll, update} from './controller';

const router = Router();

router
  .route('/')
  .get(protect, routeCatch(getAll))
  .post(routes.booking.create, routeCatch(create));

router.route('/:id').post(protect, routes.booking.update, routeCatch(update));

export const bookingRouter = router;
