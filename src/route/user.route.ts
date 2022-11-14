import { Router } from 'express';
const router = Router();
import { UserController } from '../controller';


router.get('/detail', UserController.detail)


export default router;