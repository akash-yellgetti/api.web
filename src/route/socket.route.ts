import { Router } from 'express';
const router = Router();
import { SocketController } from '../controller';


router.get('/list', SocketController.list)


export default router;