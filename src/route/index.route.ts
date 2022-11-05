import { Router } from 'express';
const router = Router();
import auth from './auth.route';

router.use('/auth', auth);


export default router;