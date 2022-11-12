import { Router } from 'express';
const router = Router();
import { SocketController } from '../controller/index.controller';


router.get('/list', SocketController.list)


export default router;