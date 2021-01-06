import {Router} from 'express';
import {protect, routeCatch} from '../../utils';
import {routes} from '../../validations';
import {create, getAll, update, search} from './controller';

const router = Router();

router
  .route('/')
  .get(protect, routeCatch(getAll))
  .post(routes.booking.create, routeCatch(create));

router
  .route('/search')
  .post(protect, routes.booking.search, routeCatch(search));
router.route('/:id').post(protect, routes.booking.update, routeCatch(update));

export const bookingRouter = router;
