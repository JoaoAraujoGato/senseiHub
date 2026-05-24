import { Router } from 'express';
import api from '../api/auth.api.js';

const router = Router();

router.post('/login', api.login);

export default router;