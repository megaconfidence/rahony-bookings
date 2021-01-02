import {Router} from 'express';
import {routeCatch} from '../../utils';
import {routes} from '../../validations';
import {signup, signin} from './controller';

const router = Router();

router.route('/signin').post(routes.auth.signin, routeCatch(signin));
router.route('/signup').post(routes.auth.signup, routeCatch(signup));

export default router;
