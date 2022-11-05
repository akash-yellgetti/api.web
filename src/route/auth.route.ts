import { Router } from 'express';
const router = Router();


router.post('/ping2', (req, res) => {
    return res.status(200).json({ message: "ping response" });
});


export default router;