import { Router } from "express";
import verifyToken from '../middlewares/authJwt'

const router = Router()


router.get('/orders', verifyToken, (req, res) => {
    res.send({
        message: 'orders create'
    })
});

export default router