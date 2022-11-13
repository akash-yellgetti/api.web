import { Router } from 'express';
const router = Router();
import { UserController } from '../controller/index.controller';


router.get('/detail', UserController.detail)


export default router;