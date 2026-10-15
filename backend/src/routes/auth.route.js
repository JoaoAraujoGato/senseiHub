import { Router } from 'express';
import api from '../api/auth.api.js';

const router = Router();

router.post('/login', (req, res, next) => 
    api
        .login(req.body)
        .then((result) => res.send(result))
        .catch(next)
);

export default router;